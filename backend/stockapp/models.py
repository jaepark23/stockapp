# models contain data of the object and the behaviors of the object

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.contrib import admin
# Create your models here.


class User(AbstractUser):
    balance = models.IntegerField(null=True)


class Share(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    ticker = models.CharField(max_length=15)
    count = models.IntegerField()

    def __str__(self):
        return self.ticker
