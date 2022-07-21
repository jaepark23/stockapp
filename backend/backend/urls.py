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

# registers /shares as a way to view all the shares from /api/shares

urlpatterns = [
    path('', views.getRoutes),
    path('shares/', views.getShares),
    path('token/', MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('admin/', admin.site.urls),
    path('data/<str:ticker>', views.GetData.as_view()),
]
