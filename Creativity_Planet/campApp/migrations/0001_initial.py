# Generated by Django 4.1.7 on 2023-03-15 19:31

import campApp.models
import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CampCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ActiveCamps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, unique=True)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('start_date', models.DateField(help_text='Enter the date of Camp', validators=[campApp.models.no_past])),
                ('end_date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('main_Image', models.ImageField(upload_to='media/activeCamps/%y/%m/%d')),
                ('price_per_child', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('max_num_of_enrolment', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('current_num_of_enrolment', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('duration', models.CharField(max_length=200, unique=True)),
                ('offer', models.CharField(max_length=200, unique=True)),
                ('location', models.CharField(max_length=200, unique=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campCategory', to='campApp.campcategory')),
            ],
        ),
    ]
