# Generated by Django 4.1.7 on 2023-03-22 20:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communityApp', '0007_postlikes_value'),
        ('campApp', '0014_alter_qrcode_image'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='campsenrollment',
            unique_together={('camp', 'user')},
        ),
    ]