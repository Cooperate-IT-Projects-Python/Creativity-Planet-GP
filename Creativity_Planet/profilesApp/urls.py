from django.urls import path,include
from . import views
# from .views import ChangePasswordView
urlpatterns = [
   path('register/', views.register, name='register'),
   path('login/', views.custom_login, name='login'),
   path('logout/', views.custom_logout, name='logout'),
   path('user/', views.user_profile, name='user_profile'),
   path('activate/<uidb64>/<token>', views.activate, name='activate'),
#    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
   path("passwordreset/", views.password_reset_request, name="password_reset1"),
   path('reset/<uidb64>/<token>/', views.passwordResetConfirm, name='password_reset_confirm'),
   path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),



]

from django.urls import path,include
from . import views
# from .views import ChangePasswordView
urlpatterns = [
   path('register/', views.register, name='register'),
   path('login/', views.custom_login, name='login'),
   path('logout/', views.custom_logout, name='logout'),
   path('myprofile/', views.user_profile, name='user_profile'),
   path('edit_user/', views.edit_user_profile, name='edit_user_profile'),
   path('activate/<uidb64>/<token>', views.activate, name='activate'),
   path("passwordreset/", views.password_reset_request, name="password_reset1"),
   path('reset/<uidb64>/<token>/', views.passwordResetConfirm, name='password_reset_confirm'),

]

