# Generated by Django 4.1.5 on 2023-01-18 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_completedcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='player_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
