from pyexpat import model
from tkinter.tix import Tree
from xml.etree.ElementTree import Comment
from django.db import models
from users.models import NewUser
from django.utils import timezone
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    status_options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(max_length=10, choices=status_options, default='published')
    objects = models.Manager()
    postobjects = PostObjects()

    class Meta:
        ordering = ("-published",)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField(max_length=500)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_name = models.TextField(default="", max_length=50)
    time = models.DateTimeField(default=timezone.now)
    parent = models.ForeignKey('Comment', on_delete=models.CASCADE, null=True, blank=True)
    isChild = models.BooleanField(default=False)
    
    def __str__(self):
        return self.author.user_name

    def children(self):
        return Comment.objects.filter(parent=self)

    @property
    def isParent(self):
        if self.isChild:
            return False
        return True

