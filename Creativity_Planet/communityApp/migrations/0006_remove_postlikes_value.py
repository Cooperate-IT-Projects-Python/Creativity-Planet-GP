# Generated by Django 4.1.7 on 2023-03-21 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communityApp', '0005_postlikes_postlikes_already liked'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postlikes',
            name='value',
        ),
    ]