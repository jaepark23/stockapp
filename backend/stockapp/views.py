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
from datetime import datetime
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

def historyHelper(user, ticker, count, buy):
    order_history = user.order_history
    if user.order_history == None:
        now = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        price = requests.get("https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper())).json()['c']
        user.order_history = {"ticker": ticker, "count": count, "price" : price, "buy" : buy}
        
    else:
        now = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        price = requests.get("https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper())).json()['c']
        order_history[now] = {"ticker": ticker, "count": count, "price" : price, "buy" : buy}

@api_view(['POST'])
def buyShares(request, ticker, count):
    user = request.user
    shares = user.share_set.all()
    call = requests.get(
        "https://finnhub.io/api/v1/quote?symbol=%s&token=cb6avbiad3i70tu62u4g" % (ticker.upper()))
    cost = call.json()['c'] * count
    if cost <= user.balance:
        existance = shares.filter(ticker__exact=ticker.upper())
        if existance:
            id = shares.filter(ticker__exact=ticker.upper())[0].id
            share = Share.objects.get(id=id)
            share.count = share.count + count
            share.save(update_fields = ['count'])
            return Response(user.balance)
        else:  
            Share.objects.create(user=user, ticker=ticker, count=count)
            user.balance = user.balance - cost
            historyHelper(user, ticker, count, True)
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
        historyHelper(user, ticker, count, False)
        user.save()
        return Response(user.balance)
    else:
        shares.save(update_fields=['count'])
        user.balance = user.balance + cost
        historyHelper(user, ticker, count, False)
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
def getAccount(request):
    user = request.user
    return Response({
        'username': user.username,
        'balance': user.balance,
        'order_history' : user.order_history
    })

@api_view(['GET'])
def getHistory(request):
    user = request.user
    return Response(user.order_history)

@api_view(['GET'])
def getBalances(request):
    user = request.user
    return Response(user.balance_history)

@api_view(['GET', 'POST', 'UPDATE'])
def editBalances(request):
    user = request.user
    print('ran')
    balance_history = user.balance_history
    if user.balance_history == None:
        now = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        balance = user.balance
        user.balance_history = {now : balance}
        user.save(update_fields = ['balance_history'])
        return Response(1)
    else:
        now = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        balance = user.balance
        balance_history[now] = balance
        user.save()
        return Response(1)

