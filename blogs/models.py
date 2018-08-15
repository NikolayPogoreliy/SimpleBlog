from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    text = models.TextField()
    last_modified = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(to=get_user_model(), related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']
