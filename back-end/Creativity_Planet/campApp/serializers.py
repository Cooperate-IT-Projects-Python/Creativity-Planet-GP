from rest_framework import serializers
from .models import *


# ///////////////////// ACTIVE CAMPS /////////////////////

# --------------- Camp Location ---------------
class CampCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CampCategory
        fields = ["name"]


# --------------- Camp Location ---------------
class CampLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampLocation
        fields = ["name"]


# --------------- Active Camps Location ---------------
class ActiveCampsSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField('get_category_field')

    def get_category_field(self, member):
        return CampCategorySerializer(CampCategory.objects.get(pk=member.category.id)).data

    location_name = serializers.SerializerMethodField('get_location_field')

    def get_location_field(self, member):
        return CampLocationSerializer(CampLocation.objects.get(pk=member.location.id)).data

    class Meta:
        model = ActiveCamps
        fields = ["pk", "title", "description", "created_at", "start_date", "end_date", "camp_time",
                  "main_Image", "price_per_child", "max_num_of_enrolment", "current_num_of_enrolment",
                  "duration", "offer", "category_name", "location_name"]


# ///////////////////// CAMPS ENROLLMENT /////////////////////
class CampsEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampsEnrollment
        fields = "__all__"


class QrCodeSerializer(serializers.ModelSerializer):
    enrolment = serializers.SerializerMethodField('get_enrolment_field')

    def get_enrolment_field(self, member):
        return CampsEnrollmentSerializer(CampsEnrollment.objects.get(pk=member.camp.id)).data

    class Meta:
        model = QrCode
        fields = ["pk", "image", "enrolment"]
        depth = 1


class ModCampsEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampsEnrollment
        fields = ['camp', 'user', 'max_attendees', 'total_price', 'had_attend', 'enrolment_date']
        read_only_fields = ('user', "total_price")


# ///////////////////// FINISHED CAMPS /////////////////////
class FinishedCampsSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField('get_category_field')

    def get_category_field(self, member):
        return CampCategorySerializer(CampCategory.objects.get(pk=member.category.id)).data

    location_name = serializers.SerializerMethodField('get_location_field')

    def get_location_field(self, member):
        return CampLocationSerializer(CampLocation.objects.get(pk=member.location.id)).data

    class Meta:
        model = FinishedCamps
        fields = ["title", "description", "av_rate", "created_at", "started_date", "ended_date",
                  "main_Image", "numOfAttendee", "duration", "category_name", "location_name"]
