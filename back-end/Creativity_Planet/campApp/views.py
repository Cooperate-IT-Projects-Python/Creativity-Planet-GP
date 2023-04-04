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
import json
import requests
from django.db.models import Count


# /////////////// ACTIVE CAMP ///////////////
# -------------- GET CREATE CAMP -----------
class ActiveCampsGetSet(generics.ListCreateAPIView):
    # queryset = ActiveCamps.objects.all()
    queryset = ActiveCamps.objects.filter(Q(end_date__gte=timezone.now().date())).order_by('-start_date')

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
    # queryset = ActiveCamps.objects.filter(start_date=now).order_by("-start_date")
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
        # qrcode_generator(camp_enrollment.data)
        #
        ###
        return Response(camp_enrollment.data, status=status.HTTP_200_OK)
    except ValueError:
        print(camp_enrollment.errors)
        return Response(status=status.HTTP_404_NOT_FOUND)


# CHECKOUT METHOD 2
@api_view(['POST'])
def mode_checkout_method(request):
    # < QueryDict: {'email': ['aya@gmail.com'], 'phone': ['01011731229'], 'numOfChildren': ['2'],
    #               'childInfo': ['[{"name":"Aya Hassan","age":5},{"name":"Aya Hassan","age":5}]'], 'city': ['cairo']}>
    # try:
    print(request.data)
    camp = ActiveCamps.objects.filter(pk=int(request.data["camp"])).first()
    if not camp:
        return JsonResponse("error: No Camp With This id", status=status.HTTP_421_MISDIRECTED_REQUEST, safe=False)
    # user = request.user
    user = profile.CustomUser.objects.filter(pk=int(request.data["user"])).first()
    if not user:
        return JsonResponse("error: No User With This id", status=status.HTTP_421_MISDIRECTED_REQUEST, safe=False)
    email = request.data["email"]
    phone = request.data["phone"]
    max_attendees = int(request.data["numOfChildren"])
    city = request.data["city"]
    payed = True if request.data["payed"] == "1" else False
    # Get The Camp Price
    total_price = camp.price_per_child * max_attendees
    # SAVE CHECKOUT INFO
    enrollment, _ = CampsEnrollment.objects.get_or_create(camp=camp, user=user)
    enrollment.payed = payed
    enrollment.email = email
    enrollment.phone = phone
    enrollment.total_price = total_price
    enrollment.max_attendees = max_attendees
    enrollment.city = city
    enrollment.save()

    # Mode The Target Camp For Number of Enrolment
    camp.current_num_of_enrolment += int(max_attendees)
    camp.save()
    # Save Children Info
    childInfo = request.data["childInfo"]
    childInfo = json.loads(childInfo)
    for child in childInfo:
        AttendeesNamesAges.objects.create(enrollment=enrollment,
                                          name=child["name"],
                                          age=int(child["age"]))
    # Generate QRCODE
    url = f"User is {user} With ID:{user.id}"
    qr_obj = QrCode.objects.create(url=url, camp=enrollment)
    qr_obj_ser = QrCodeSerializer(qr_obj)

    return Response(qr_obj_ser.data, status=status.HTTP_200_OK)
    # except ValueError:
    #     return Response(status=status.HTTP_404_NOT_FOUND)


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

# /////////////// ORDER ///////////////
# def orders(request):
#     # order = Order.objects.create(
#     #     amount=1000,  # enter amount here
#     # )
#     # order.generate_secret()
#     # order.save()  # Payment data
#
#     url = "https://stage-api.ioka.kz/v2/orders"
#
#     payload = json.dumps({
#         'amount': 10000
#     })
#     headers = {
#         'API-KEY': 'eyJ0eXAiOiJKV1..',
#         'Content-Type': 'application/json'
#     }
#
#     response = requests.post(url, headers=headers, data=payload)
#     # order = response.json()['order']
#
#     # print(order['checkout_url'])
#     # print(response)
#     return Response(status=status.HTTP_200_OK)
