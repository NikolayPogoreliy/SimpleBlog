from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Posts, Comments


class BasicPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('id', 'title', 'text', 'is_published', 'author')


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('id', 'title', 'text', 'created', 'author')


class PostDetailSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Posts
        fields = ('url','id', 'title', 'text', 'created', 'author', 'last_modified', 'is_published')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # posts = serializers.HyperlinkedRelatedField(many=True, view_name='posts-detail', read_only=True)
    # posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Posts.objects.all())
    posts = PostDetailSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'posts')
