

from django.urls import path
from . import views

urlpatterns = [
    # Get All Posts generics
    path('getactivecamps/', views.ActiveCampsGetSet.as_view()),
]
