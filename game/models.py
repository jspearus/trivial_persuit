from django.db import models

# Create your models here.


class Player(models.Model):
    player = models.CharField(max_length=20)
    player_number = models.IntegerField(
        blank=True, null=True)
    score = models.IntegerField(
        default=0)
    difficulty = models.CharField(max_length=20, blank=True, null=True)
    completed_category = models.CharField(max_length=1000,
                                          default=',')

    def __str__(self):
        return self.player


# todo: resuse for game stats and data
class CompletedCategory(models.Model):
    player = models.CharField(max_length=20)
    completed_category = models.CharField(max_length=50)

    def __str__(self):
        return self.completed_category
