from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    #oauth2
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    #other urls
    path('admin/', admin.site.urls),
    path('', include('blog.urls', namespace='blog')),
    path('api/', include('blog_api.urls', namespace='blog_api')),
    path('api/user/', include('users.urls', namespace='users')),
    path('docs/', include_docs_urls(title='tiblo-API')),
    path('schema', get_schema_view(
        title="tiblo-API",
        description="API for tiblo",
        version="1.0.0"
    ), name="openapi-schema"),
]

