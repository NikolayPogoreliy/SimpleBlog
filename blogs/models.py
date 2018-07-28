from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Posts(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    text = models.TextField()
    last_modified = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Posts'
        ordering = ['created']


class Comments(models.Model):
    post = models.ForeignKey(to=Posts, on_delete=models.CASCADE)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    parent_id = models.IntegerField(null=True, default=None)
    text = models.TextField()

    def __str__(self):
        return self.text[:20]

    class Meta:
        ordering = ['-created']