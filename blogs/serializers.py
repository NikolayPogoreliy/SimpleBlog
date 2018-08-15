from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Post


class UserBaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'url', 'first_name', 'last_name', 'username']


class PostBaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'url', 'title', 'created']


class UserSerializer(UserBaseSerializer):
    posts = PostBaseSerializer(many=True, read_only=True)

    class Meta(UserBaseSerializer.Meta):
        fields = ['posts'] + UserBaseSerializer.Meta.fields


class PostSerializer(PostBaseSerializer, serializers.HyperlinkedModelSerializer):
    author = UserBaseSerializer(read_only=True)

    class Meta(PostBaseSerializer.Meta):
        fields = ['text', 'author', 'last_modified', 'is_published'] + PostBaseSerializer.Meta.fields

