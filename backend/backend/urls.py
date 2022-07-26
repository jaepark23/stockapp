# purpose is to access different urls and paths in the website
# specifically this is to set up the api that will allow users to 
# Create, Read, Update, and Delete data

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from stockapp import views
from stockapp.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stockapp.urls')),
    path('data/<str:ticker>', views.GetData.as_view()),
]