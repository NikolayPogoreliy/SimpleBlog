from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Posts, Comments


class UserInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'first_name', 'last_name')


class PostDetailSerializer(serializers.HyperlinkedModelSerializer):
    # author = serializers.ReadOnlyField(source='author.username')
    author = UserInfoSerializer(read_only=True)

    class Meta:
        model = Posts
        fields = ('url', 'id', 'title', 'text', 'created', 'author', 'last_modified', 'is_published')

class PostListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posts
        fields = ('url', 'title', 'created')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = PostListSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'posts')
