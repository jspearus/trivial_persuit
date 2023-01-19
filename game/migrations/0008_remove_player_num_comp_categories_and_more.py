# Generated by Django 4.1.5 on 2023-01-18 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_rename_num_comp_catagories_player_num_comp_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='num_comp_categories',
        ),
        migrations.AddField(
            model_name='player',
            name='completed_category',
            field=models.CharField(blank=True, max_length=600, null=True),
        ),
    ]
