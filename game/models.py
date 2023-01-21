from django.db import models
from django.utils import timezone

# Create your models here.


class Player(models.Model):
    player = models.CharField(max_length=20)
    player_number = models.IntegerField(
        blank=True, null=True)
    score = models.IntegerField(
        default=0)
    difficulty = models.CharField(max_length=20, blank=True, null=True)
    completed_category = models.CharField(max_length=1000,
                                          default='None')
    Date_started = models.DateField(default=timezone.now)

    def __str__(self):
        return str(self.player)


class GameData(models.Model):
    name = models.CharField(max_length=20, default='game')
    current_player = models.IntegerField(
        default=1)
    num_players = models.IntegerField(
        default=0)
    Date_started = models.DateField(default=timezone.now)

    def __str__(self):
        return str(self.name) + ': ' + str(self.num_players)
