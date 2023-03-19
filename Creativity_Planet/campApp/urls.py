from django.urls import path
from . import views

urlpatterns = [
    # /////// ACTIVE CAMPS /////////
    # Get All Active Camps generics
    path('getactivecamps/', views.ActiveCampsGetSet.as_view()),
    # GET BEST ACTIVE CAMPS
    path('getbestactivecamps/', views.GetBestActiveCamps.as_view()),
    # GET SOON ACTIVE CAMPS
    path('getsoonactivecamps/', views.GetSoonActiveCamps.as_view()),
    # /////// CHECKOUT /////////
    # Checkout Method
    path('checkout/', views.checkout_method),
    # UPDATE DELETE Enrollment
    path('updelenrollment/<int:pk>', views.enrollment_modify),
    # /////// FINISHED CAMPS /////////
    # Get All Finished Camps
    path('getfinishedcamps/', views.GetFinishedCamps.as_view()),
]
