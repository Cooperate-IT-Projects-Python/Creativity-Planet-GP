# Generated by Django 4.1.7 on 2023-03-20 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campApp', '0013_qrcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qrcode',
            name='image',
            field=models.ImageField(blank=True, upload_to='media/qrcods/%y/%m/%d'),
        ),
    ]