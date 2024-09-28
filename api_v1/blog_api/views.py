import json
from django.shortcuts import get_object_or_404
from rest_framework import generics
from blog.models import Post, Comment
from django.http import HttpResponse, JsonResponse
from users.models import NewUser
from .serializers import PostSerializer, CommentSerializer
from django.core import serializers
from users.serializers import CustomUserSerializerWithoutAbout
from rest_framework.permissions import SAFE_METHODS, AllowAny, BasePermission, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from django.shortcuts import get_object_or_404
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

#SAFE_METHODS = ['GET', 'OPTIONS', 'HEAD'] and the rest are 'POST', 'PUT', 'PATCH', 'UPDATE', 'DELETE'.

class PostUserWritePermission(BasePermission):
    message = "Editing posts is restricted to the author only."
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return False
        return obj.author == request.user   

class PostPermission(BasePermission):
    message = "Editing posts is restricted to the author only."
    def has_object_permission(self, request, view, obj):
        if request.method !='POST':
            return False
        return obj.author == request.user and request.headers['x-csrftoken'] == get_token()

@method_decorator(ensure_csrf_cookie, name='dispatch')
class getcsrf(generics.ListAPIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        return JsonResponse({'Success': 'CSRF Cookie set'})

class AllBlogsList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

class AddFollowers(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = NewUser.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        user = NewUser.objects.get(id=self.kwargs.get('pk'))
        user.followers += 1
        user.save()

class RemoveFollowers(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = NewUser.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        user = NewUser.objects.get(id=self.kwargs.get('pk'))
        if(user.followers != 0):
            user.followers -= 1
            user.save()

class CommentView(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = self.kwargs.get('pk')
        return Comment.objects.filter(post=post, isChild=False).order_by('-time')

class CommentCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class UserBlogsList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.kwargs.get('pk')
        return Post.objects.filter(author=user).order_by('-published')

class LeaderBoardList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = NewUser.objects.all()
    serializer_class = CustomUserSerializerWithoutAbout

    def get_queryset(self):
        category = self.kwargs.get('pk')
        if category == 10 or category == '10':
            return NewUser.objects.order_by('-followers')[:100]
        return NewUser.objects.filter(topic=category).order_by('-followers')[:100]

def idEndpoint(request, pk):
    user = NewUser.objects.filter(email=pk)
    if request.method not in SAFE_METHODS:
        return HttpResponse(status=400)
    return JsonResponse({ 'id': user[0].id })

def UserDetail(request, pk):
    user = NewUser.objects.filter(id=pk)
    fields = ('email', 'user_name', 'first_name', 'start_date', 'followers', 'topic', 'blogs_written')
    if request.method not in SAFE_METHODS:
        return HttpResponse(status=400)
    if user[0].topic != 10:
        return JsonResponse({
            'user': json.loads(serializers.serialize('json', list(user), fields=fields))[0]['fields'],
            'total_rank': list(NewUser.objects.order_by('-followers').values_list('id')).index((pk,)) + 1,
            'topic_rank': list(NewUser.objects.filter(topic=user[0].topic).order_by('-followers').values_list('id')).index((pk,)) + 1 
            })
    return JsonResponse({
            'user': json.loads(serializers.serialize('json', list(user), fields=fields))[0]['fields'],
            'total_rank': list(NewUser.objects.order_by('-followers').values_list('id')).index((user.id,)) + 1,
            })

class PostDetail(generics.RetrieveAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, id=item)

class PostSearch(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["^title", "=title"]

# @method_decorator(csrf_protect, name='post')
class PostCreate(generics.CreateAPIView):
    permission_classes = [PostPermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def get_queryset(self):
        user = NewUser.objects.get(id=self.kwargs.get('pk'))
        user.blogs_written += 1
        user.save()
        return Post.objects.all()
        
class PostUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDestroy(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
