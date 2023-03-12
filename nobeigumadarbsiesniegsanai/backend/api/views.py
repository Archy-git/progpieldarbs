#from django.shortcuts import render
#from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
#from rest_framework.decorators import api_view, permission_classes
from .models import Expense
from .serializer import ExpenseSerializer
from .permissions import IsOwner
#from rest_framework.views import APIView

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class ExpenseRetrieveView(generics.RetrieveAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = 'id'
    permission_classes = [IsOwner, IsAuthenticated]

class ExpenseCreateView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

class ExpenseUpdateView(generics.UpdateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = 'id'
    permission_classes = [IsOwner, IsAuthenticated]

class ExpenseDeleteView(generics.DestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = 'id'
    permission_classes = [ IsOwner, IsAuthenticated]


class ExpenseListByUser(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        expenses = Expense.objects.filter(user_id=user_id)
        return expenses


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/',
        '/api/expenses/<int:id>/',
        '/api/expenses/',
        '/api/expenses/<int:id>/update/',
        '/api/expenses/<int:id>/delete/',
        '/api/expenses/user/'
    ]
    return Response(routes)