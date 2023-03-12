from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('expenses/<int:id>/', views.ExpenseRetrieveView.as_view()),
    path('expenses/', views.ExpenseCreateView.as_view()),
    path('expenses/<int:id>/update/', views.ExpenseUpdateView.as_view()),
    path('expenses/<int:id>/delete/', views.ExpenseDeleteView.as_view()),
    path('expenses/user/', views.ExpenseListByUser.as_view(), name='expense-list-by-user'),
    path('', views.getRoutes)
]
