from rest_framework import serializers
from blog.models import Post, Comment
from django.conf import settings

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'content', 'slug', 'status', 'category')

class CommentChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'text', 'author', 'user_name', 'parent', 'isChild')

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'post', 'text', 'author', 'user_name', 'parent', 'isChild', 'replies')
    def get_replies(self, obj):
        if obj.isChild != True:
            return CommentChildSerializer(obj.children(), many=True).data
        return None

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}