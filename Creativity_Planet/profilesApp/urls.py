from django.urls import path,include
from . import views
urlpatterns = [
   path('register/', views.register, name='register'),
   path('login/', views.custom_login, name='login'),
   path('logout/', views.custom_logout, name='logout'),
   path('activate/<uidb64>/<token>', views.activate, name='activate'),
]
