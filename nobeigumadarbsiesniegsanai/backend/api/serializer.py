from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Expense


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user



class ExpenseSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    #amount = serializers.SerializerMethodField()
    #amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Expense
        fields = ('id', 'user_id', 'category', 'currency', 'date', 'amount')

    def get_user_id(self, obj):
        return self.context['request'].user.id

    def create(self, validated_data):
        validated_data['user_id'] = self.get_user_id(None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['user_id'] = self.get_user_id(None)
        return super().update(instance, validated_data)

    #def get_amount(self, obj):
        # Convert decimal value to float
    #    return float(obj.amount)
    
    def to_representation(self, instance):
        # Convert decimal value to float for GET requests
        data = super().to_representation(instance)
        data['amount'] = float(data['amount'])
        return data

    def to_internal_value(self, data):
        # Convert float value to decimal for POST requests
        if 'amount' in data:
            data['amount'] = str(data['amount'])
        return super().to_internal_value(data)