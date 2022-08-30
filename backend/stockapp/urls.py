from django.urls import path
from . import views
from .views import MyTokenObtainPairView, RegisterView, buyShares, sellShares, getAccount, getHistory, getBalances, editBalances

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('shares/', views.getShares),
    path('shares/buy/<str:ticker>/<int:count>', views.buyShares),
    path('shares/sell/<str:ticker>/<int:count>', views.sellShares),
    path('account', views.getAccount),
    path('account/history', views.getHistory),
    path('account/balances', views.getBalances),
    path('account/balances/edit', views.editBalances),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/register/', RegisterView.as_view(), name='token_register')
]
