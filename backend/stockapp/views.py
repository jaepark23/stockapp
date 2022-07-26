# provides implementation for CRUD operations

from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from rest_framework.decorators import api_view
from .serializers import ShareSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .models import Share
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
import requests
import time
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getShares(request):
    user = request.user
    shares = user.share_set.all()
    serializer = ShareSerializer(shares, many=True)
    return Response(serializer.data)

# API view for retrieving stock data for Portfolio.js via finnhub 
class GetData(APIView):
    test = [1, 2, 3, 4, 5]

    def get(self, request, ticker):
        time.sleep(.1)
        call = requests.get(
            "https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper()))
        return Response(call.json())


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['POST'])
def buyShares(request, ticker, count):
    user = request.user
    call = requests.get(
        "https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper()))
    cost = call.json()['c'] * count
    if cost <= user.balance:
        Share.objects.create(user=user, ticker=ticker, count=count)
        print('success')
        user.balance = user.balance - cost
        user.save()
        return Response(user.balance)
    else:
        return Response(4)


@api_view(['POST', 'GET', 'DELETE'])
def sellShares(request, ticker, count):
    user = request.user
    shares = user.share_set.all()
    id = shares.filter(ticker__exact=ticker.upper())[0].id
    shares = Share.objects.get(id=id)
    call = requests.get(
        "https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper()))
    if shares.count - count < 0:
        diff = shares.count
    else:
        diff = count
    cost = call.json()['c'] * diff
    shares.count = shares.count - diff

    if shares.count <= 0:
        shares.delete()
        user.balance = user.balance + cost
        user.save()
        return Response(user.balance)
    else:
        shares.save(update_fields=['count'])
        user.balance = user.balance + cost
        user.save()
        return Response(user.balance)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET'])
def getBalance(request):
    user = request.user
    return Response({
        'username': user.username,
        'balance': user.balance,
    })
