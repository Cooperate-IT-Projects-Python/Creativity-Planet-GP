from django.shortcuts import render
from .serializers import *
from rest_framework import generics, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from django.http import JsonResponse

from django.db.models import Count


# /////////////// ACTIVE CAMP ///////////////
# -------------- GET CREATE CAMP -----------
class ActiveCampsGetSet(generics.ListCreateAPIView):
    queryset = ActiveCamps.objects.all()
    serializer_class = ActiveCampsSerializer
    authentication_classes = [TokenAuthentication]


# -------------- BEST ACTIVE CAMPs -----------
class GetBestActiveCamps(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = ActiveCamps.objects.all().order_by("-current_num_of_enrolment")[:5]

    serializer_class = ActiveCampsSerializer

    def get(self, request):
        return self.list(request)


# -------------- SOON ACTIVE CAMPs -----------
class GetSoonActiveCamps(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    # queryset = ActiveCamps.objects.filter(start_date=now).order_by("-tart_date")
    queryset = ActiveCamps.objects.filter(Q(start_date__gt=timezone.now().date())).order_by('-start_date')
    serializer_class = ActiveCampsSerializer

    def get(self, request):
        return self.list(request)


# -------------- GET ACTIVE By Category CAMPs -----------
@api_view(['GET'])
def active_camps_by_category(request, pk):
    queryset = ActiveCamps.objects.filter(category=pk).order_by('-start_date')
    active_camps = ActiveCampsSerializer(queryset, many=True)
    return JsonResponse(active_camps.data,
                        safe=False, status=status.HTTP_200_OK)


# /////////////// CHECKOUT ///////////////
def qrcode_generator(code):
    return QrCode.objects.create(url=code)


@api_view(['POST'])
def checkout_method(request):
    try:
        camp_enrollment = CampsEnrollmentSerializer(data=request.data)
        camp_enrollment.is_valid(raise_exception=True)
        print(request.data)
        target_camp = ActiveCamps.objects.filter(id=request.data["camp"]).first()
        total_price = target_camp.price_per_child * int(request.data["max_attendees"])
        camp_enrollment.validated_data['total_price'] = total_price
        camp_enrollment.save()
        target_camp.current_num_of_enrolment += int(request.data["max_attendees"])
        target_camp.save()
        ###
        # PAYMENT METHOD "Check If he needs to pay Or not for Update"
        # METHOD
        ###
        ###
        # QRCode Generator
        # qr_image = qrcode_generator("Ahmed,Ali,Hassan")
        #
        ###
        return Response(camp_enrollment.data, status=status.HTTP_200_OK)
    except ValueError:
        print(camp_enrollment.errors)
        return Response(status=status.HTTP_404_NOT_FOUND)


# ------------ UPDATE DELETE Checkout -----------

@api_view(['GET', "PUT", "DELETE"])
def enrollment_modify(request, pk):
    # ----- GET -----
    if request.method == "GET":
        target_enrolled = CampsEnrollment.objects.filter(pk=pk).first()
        target_enrolled_serial = CampsEnrollmentSerializer(target_enrolled)
        return Response(target_enrolled_serial.data, status=status.HTTP_200_OK)
    # ----- PUT -----
    elif request.method == "PUT":
        camp_new_enrollment = CampsEnrollmentSerializer(data=request.data)
        try:
            camp_new_enrollment.is_valid(raise_exception=True)
        except ValueError:
            print(camp_new_enrollment.errors)
            return Response(status=status.HTTP_404_NOT_FOUND)
        # DELETE OLD
        target_enrolled = get_object_or_404(CampsEnrollment, pk=pk)
        target_enrolled.camp.current_num_of_enrolment -= target_enrolled.max_attendees
        target_enrolled.camp.save()
        # Get Price
        old_payed = target_enrolled.total_price
        target_enrolled.delete()
        # ADD NEW
        target_camp = ActiveCamps.objects.filter(id=request.data["camp"]).first()
        total_price = target_camp.price_per_child * int(request.data["max_attendees"])
        camp_new_enrollment.validated_data['total_price'] = total_price
        camp_new_enrollment.save()
        target_camp.current_num_of_enrolment += int(request.data["max_attendees"])
        target_camp.save()
        ###
        # PAYMENT METHOD "Check If he needs to pay Or not for Update"
        # METHOD
        ###
        return Response(camp_new_enrollment.data, status=status.HTTP_200_OK)
    # ----- DELETE -----
    else:
        target_enrolled = get_object_or_404(CampsEnrollment, pk=pk)
        target_enrolled.camp.current_num_of_enrolment -= target_enrolled.max_attendees
        target_enrolled.camp.save()
        target_enrolled.delete()
        # SEND To Admin To Retrieve Money
        return Response(status=status.HTTP_200_OK)


# /////////////// FINISHED CAMP ///////////////
class GetFinishedCamps(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = FinishedCamps.objects.all()
    serializer_class = FinishedCampsSerializer

    def get(self, request):
        return self.list(request)
