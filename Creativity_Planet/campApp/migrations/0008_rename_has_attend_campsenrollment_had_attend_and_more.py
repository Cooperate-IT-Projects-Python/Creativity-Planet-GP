# Generated by Django 4.1.7 on 2023-03-15 22:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campApp', '0007_remove_campsenrollment_title_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='campsenrollment',
            old_name='has_attend',
            new_name='had_attend',
        ),
        migrations.AlterField(
            model_name='activecamps',
            name='price_per_child',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(10)]),
        ),
    ]