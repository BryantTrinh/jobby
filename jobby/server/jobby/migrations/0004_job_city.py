# Generated by Django 5.1.1 on 2024-10-18 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobby', '0003_job_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='city',
            field=models.TextField(default=None, null=True),
        ),
    ]
