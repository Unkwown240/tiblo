from dataclasses import fields
from django.contrib import admin
from . import models

@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author','category')
    prepopulated_fields = { 'slug': ('title',), }

# @admin.register(models.Comment)
# class CommentAdmin(admin.ModelAdmin):
#     fieldsets = [
#         ("post", {'fields': ["post"]}),
#         ("text", {'fields': ["text"]}),
#         ("author", {'fields': ["author"]}),
#         ("replies", {'fields': ["replies"]}),
#     ]


admin.site.register(models.Category)
admin.site.register(models.Comment)