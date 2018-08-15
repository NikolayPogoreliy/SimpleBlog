from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets

from .models import Post
from .serializers import PostSerializer, UserSerializer
from .permissions import IsAuthor
# Create your views here.


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    user_model = get_user_model()
    queryset = user_model.objects.exclude(is_staff=True).select_related()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsAuthor)


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_published=True).select_related()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsAuthor)
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


