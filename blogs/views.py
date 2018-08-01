from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, views, response
from rest_framework import status


from .models import Posts
from .serializers import PostDetailSerializer, UserSerializer
from .permissions import IsAuthor, MyPermission
# Create your views here.


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.exclude(is_staff=True).select_related()
    serializer_class = UserSerializer


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.filter(is_published=True).select_related()
    serializer_class = PostDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthor, MyPermission)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostCreate(views.APIView):
    queryset = Posts.objects.all().select_related()
    def post(self, request, format=None):
        serializer = PostDetailSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            # print(serializer.data)
            # serializer.data.author = request.user.id
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
