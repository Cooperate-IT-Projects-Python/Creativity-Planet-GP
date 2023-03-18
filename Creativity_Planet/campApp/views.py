from django.shortcuts import render
from .serializers import *
from rest_framework import generics, mixins
from rest_framework.authentication import TokenAuthentication
from django.db.models import Count


# Create Active Camp.
class ActiveCampsGetSet(generics.ListCreateAPIView):
    queryset = ActiveCamps.objects.all()
    serializer_class = ActiveCampsSerializer
    authentication_classes = [TokenAuthentication]

# CHECKOUT.

