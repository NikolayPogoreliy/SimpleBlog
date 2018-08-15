from django.contrib import admin
from .models import Post

# Register your models here.


class PostsAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'created', 'last_modified', 'is_published')


admin.site.register(Post, PostsAdmin)
