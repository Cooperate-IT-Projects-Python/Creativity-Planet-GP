from django.urls import path
from . import views

urlpatterns = [
    # Get All Posts generics
    path('posts/', views.PostGenericsList.as_view()),
    # Get Update Delete Post generics
    path('getupdelpost/<int:pk>', views.PostGenericsPk.as_view()),
]
