from django.shortcuts import render
from .models import Posts
from .serializers import *
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication


class PostGenericsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = AllPostsSerializer
    authentication_classes = [TokenAuthentication]


# Get put and delete
class PostGenericsPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = AllPostsSerializer
    authentication_classes = [TokenAuthentication]

