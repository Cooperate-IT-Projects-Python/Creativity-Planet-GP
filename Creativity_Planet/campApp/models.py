from django.db import models
from datetime import datetime
from datetime import date
from django.utils.timezone import now
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from communityApp.models import UserTest
# QRCODE
import qrcode
from PIL import Image, ImageDraw
from io import BytesIO
from django.core.files import File
import random


# Camp_Category
# Active Camps - activeCamps images - activeCamps images
# Camps Enrollment
# Finished Camps - Finished images - Finished images


class CampCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class CampLocation(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


def no_past(value):
    today = date.today()
    if value < today:
        raise ValidationError('Camp Start Date Cannot be in the PAST')


class ActiveCamps(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=now, blank=True)
    start_date = models.DateField(help_text="Enter the Start date of Camp It Must Be greater Than Today",
                                  null=False,
                                  blank=False, validators=[no_past])
    end_date = models.DateField(help_text="Enter the End date of Camp It Must Be less Than Start Date", null=False,
                                blank=False)
    camp_time = models.TimeField(default=now, auto_now=False, auto_now_add=False)
    category = models.ForeignKey(CampCategory, on_delete=models.CASCADE, related_name='campCategory')
    main_Image = models.ImageField(upload_to='media/activeCampsMain/%y/%m/%d')
    price_per_child = models.IntegerField(default=10, validators=[MinValueValidator(10)], null=False, blank=False)
    max_num_of_enrolment = models.IntegerField(default=1, validators=[MinValueValidator(1)], null=False, blank=False)
    current_num_of_enrolment = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    duration = models.CharField(max_length=100, null=True, blank=True)
    offer = models.CharField(max_length=200)
    location = models.ForeignKey(CampLocation, on_delete=models.CASCADE, related_name='campCategory', null=False,
                                 blank=False)
    finished = models.BooleanField(default=False)

    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError("end_date Cant be Grater Than start_date")
        self.duration = self.end_date - self.start_date
        super(ActiveCamps, self).clean()

    def __str__(self):
        return self.title


class ActiveCampImages(models.Model):
    image = models.ImageField(upload_to='media/activeCampsSub/%y/%m/%d', null=False, blank=False)
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='campImages')

    def __str__(self):
        return f"Image {self.id} For {self.camp.title}"


class ActiveCampVideos(models.Model):
    url = models.CharField(max_length=300, null=False, blank=False)
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='campVideo')

    def __str__(self):
        return f"Video {self.id} For {self.camp.title}"


# QR MODEL
class QrCode(models.Model):
    url = models.URLField()
    image = models.ImageField(upload_to='media/qrcods/%y/%m/%d', blank=True)

    def __str__(self):
        return f"QRCode {self.id} For {self.url} as Image {self.image}"

    def save(self, *args, **kwargs):
        qrcode_img = qrcode.make(self.url)
        canvas = Image.new("RGB", (300, 300), "white")
        draw = ImageDraw.Draw(canvas)
        canvas.paste(qrcode_img)
        buffer = BytesIO()
        canvas.save(buffer, "PNG")
        self.image.save(f'image{random.randint(0, 9999)}.png', File(buffer), save=False)
        canvas.close()
        super().save(*args, **kwargs)


class CampsEnrollment(models.Model):
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='campsEnrollment')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='campsEnrollment')
    state = models.BooleanField(default=False)
    max_attendees = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, null=False, blank=False)
    zip_code = models.IntegerField(null=False, blank=False)
    had_attend = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    total_price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    enrolment_date = models.DateTimeField(default=now, blank=True)

    # qrcode_url = models.ForeignKey(QrCode, on_delete=models.CASCADE, related_name='campsEnrollment')

    def clean(self):
        self.total_price = self.max_attendees * self.camp.price_per_child
        self.camp.current_num_of_enrolment += self.max_attendees
        self.camp.save()
        print(self.total_price)
        print(self.max_attendees)
        print(self.camp.price_per_child)
        super(CampsEnrollment, self).clean()

    class Meta:
        unique_together = ('camp', 'user',)

    def __str__(self):
        return f"{self.user.name} Enrolled {self.camp.title} EnrollID {self.id}"


class AttendeesNamesAges(models.Model):
    enrollment = models.ForeignKey(CampsEnrollment, on_delete=models.CASCADE, related_name='attendeesNamesAges')
    name = models.CharField(max_length=200)
    age = models.FloatField(default=5, validators=[MinValueValidator(5), MaxValueValidator(12)])

    def __str__(self):
        return f"Attendees Names {self.name} Ages {self.age} for {self.enrollment}"


# ////////// FINISHED CAMPS ///////////
def no_future(value):
    today = date.today()
    if value > today:
        raise ValidationError('This is  a Finished Camp Start Date Cannot be in the Future')


class FinishedCamps(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    av_rate = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    created_at = models.DateTimeField(default=now, blank=True)
    started_date = models.DateField(help_text="Enter the Start date of Camp It Must Be greater Less Today",
                                    null=False,
                                    blank=False, validators=[no_future])
    ended_date = models.DateField(help_text="Enter the End date of Camp It Must Be less Than Start Date", null=False,
                                  blank=False)
    category = models.ForeignKey(CampCategory, on_delete=models.CASCADE, related_name='finishedCampCategory')
    main_Image = models.ImageField(upload_to='media/activeCampsMain/%y/%m/%d')
    numOfAttendee = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    duration = models.CharField(max_length=100, null=True, blank=True)
    location = models.ForeignKey(CampLocation, on_delete=models.CASCADE, related_name='finishedCampCategory',
                                 null=False,
                                 blank=False)


class FinishedCampImages(models.Model):
    image = models.ImageField(upload_to='media/finishedCampsSub/%y/%m/%d', null=False, blank=False)
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='finishedCampImages')

    def __str__(self):
        return f"Image {self.id} For {self.camp.title}"


class FinishedCampVideos(models.Model):
    url = models.CharField(max_length=300, null=False, blank=False)
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='finishedCampVideo')

    def __str__(self):
        return f"Video {self.id} For {self.camp.title}"


# class Order(models.Model):
#     secret = models.CharField(max_length=1000, default="", blank=True)
#     amount = models.DecimalField(default=0)
#     paid = models.BooleanField(default=False)
#     checkout_url = models.CharField(max_length=1000, default="", blank=True)
#
#     def generate_secret(self):
#         self.secret = str(random.randint(10000, 99999))
