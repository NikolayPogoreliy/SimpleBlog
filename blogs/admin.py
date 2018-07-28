from django.contrib import admin
from .models import Posts

# Register your models here.


class PostsAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'created', 'last_modified', 'is_published')


admin.site.register(Posts, PostsAdmin)
