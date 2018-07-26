from rest_framework import serializers
from .models import Posts, Comments

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('id', 'title', 'text', 'is_published', 'author')