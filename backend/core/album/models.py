from django.db import models
from core.users.models import UserAccount


# Create your models here.
class Album(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    img_url = models.URLField()
