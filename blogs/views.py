from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response


from .models import Posts
from .serializers import PostListSerializer, PostDetailSerializer, UserSerializer
from .permissions import IsAuthor
# Create your views here.


# class PostList(generics.ListCreateAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostDetailSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#
#     def perfom_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#
# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostDetailSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthor)


# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#
# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.exclude(is_staff=True).select_related()
    serializer_class = UserSerializer


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all().select_related()
    serializer_class = PostDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthor)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
