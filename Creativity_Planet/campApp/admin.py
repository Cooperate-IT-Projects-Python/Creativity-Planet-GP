from django.contrib import admin
from .models import *

# Camp_Category
# Active Camps - activeCamps images - activeCamps images
# Camps Enrollment
# Finished Camps - Finished images - Finished images
# Register your models here.
admin.site.register(CampCategory)
admin.site.register(CampLocation)
admin.site.register(ActiveCamps)
admin.site.register(ActiveCampImages)
admin.site.register(ActiveCampVideos)
admin.site.register(CampsEnrollment)
admin.site.register(AttendeesNamesAges)
admin.site.register(QrCode)
admin.site.register(FinishedCamps)
admin.site.register(FinishedCampImages)
admin.site.register(FinishedCampVideos)
