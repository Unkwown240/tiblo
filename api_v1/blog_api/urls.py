from django.urls import path
from .views import AllBlogsList, getcsrf, idEndpoint, AddFollowers, RemoveFollowers, PostDetail, PostSearch, UserBlogsList, PostCreate, PostDestroy, PostUpdate, UserDetail, CommentView, CommentCreate, CommentUpdate, LeaderBoardList

app_name = 'blog_api'

urlpatterns = [
    path('', AllBlogsList.as_view(), name="list"),
    path('userBlogs/<int:pk>/', UserBlogsList.as_view(), name="userList"),
    path('id/<str:pk>/', idEndpoint, name="id"),
    path('blogs/<int:pk>/', PostDetail.as_view(), name="blogDetail"),
    path('user/<int:pk>/', UserDetail, name="userDetail"),
    path('addFollowers/<int:pk>/', AddFollowers.as_view(), name="addFollowers"),
    path('removeFollowers/<int:pk>/', RemoveFollowers.as_view(), name="removeFollowers"),
    path('search/custom/', PostSearch.as_view(), name="search"),
    path('leaderboard/<int:pk>/', LeaderBoardList.as_view(), name="leaderboard"),
    path('comments/<int:pk>/', CommentView.as_view(), name="CommentsList"),
    path('csrf/', getcsrf.as_view(), name="getcsrf"),
    #urls for crud(admin)
    path('admin/commentCreate/', CommentCreate.as_view(), name="createComment"),
    path('admin/commentUpdate/<int:pk>/', CommentUpdate.as_view(), name="updateComment"),
    path('admin/create/<int:pk>/', PostCreate.as_view(), name="create"),
    path('admin/update/<int:pk>/', PostUpdate.as_view(), name="update"),
    path('admin/delete/<int:pk>/', PostDestroy.as_view(), name="delete"),
]