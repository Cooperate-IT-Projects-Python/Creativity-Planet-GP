from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import CustomUser


class SignUpUserSerialzer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=100, write_only=True)

    def validate_password(self, password):
        return make_password(password)

    class Meta:
        model = CustomUser
        fields = '__all__'

class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser

    """
    Serializer for password change endpoint.
    """
    password = serializers.CharField(max_length=100, write_only=True)
    def validate_password(self, password):
        return make_password(password)
    
    class Meta:
        model = CustomUser
        fields = ['password']      