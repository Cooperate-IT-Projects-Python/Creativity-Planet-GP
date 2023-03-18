from django.db import models
from datetime import datetime
from datetime import date
from django.utils.timezone import now
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from communityApp.models import UserTest


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


class CampsEnrollment(models.Model):
    camp = models.ForeignKey(ActiveCamps, on_delete=models.CASCADE, related_name='campsEnrollment')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='campsEnrollment')
    max_attendees = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    had_attend = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    total_price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    enrolment_date = models.DateTimeField(default=now, blank=True)

    def clean(self):
        self.total_price = self.max_attendees * self.camp.price_per_child
        print(self.total_price)
        print(self.max_attendees)
        print(self.camp.price_per_child)
        super(CampsEnrollment, self).clean()

    def __str__(self):
        return f"{self.user.name} Enrolled {self.camp.title}"
