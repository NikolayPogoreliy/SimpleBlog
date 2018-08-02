from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import permissions, viewsets, views, response, generics
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
    permission_classes = (permissions.AllowAny, IsAuthor, MyPermission)
    http_method_names = [u'get', u'post', u'put', u'patch', u'delete', u'head', u'options', u'trace']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()

    def get(self, request, format=None):
        posts = Posts.objects.filter(is_published=True).select_related()
        serializer = PostDetailSerializer(posts, many=True, context={'request': request})
        return response.Response(serializer.data)

    def post(self, request, format=None):

        serializer = PostDetailSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            # print(serializer.data)
            # serializer.data.author = request.user.id
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        author = User.objects.get(self.request.user.id)
        serializer.save(author_id=1)

class PostDetail(views.APIView):
    queryset = Posts.objects.all().select_related()

    def get_object(self, pk):
        try:
            return Posts.objects.get(pk=pk)
        except Posts.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostDetailSerializer(post)
        return response.Response(serializer.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostDetailSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)
