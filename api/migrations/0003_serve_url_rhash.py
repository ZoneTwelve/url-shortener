# Generated by Django 3.2.6 on 2021-08-25 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_serve_url_uhash'),
    ]

    operations = [
        migrations.AddField(
            model_name='serve_url',
            name='rhash',
            field=models.CharField(default='', max_length=16),
        ),
    ]
