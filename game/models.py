from django.db import models
from django.utils import timezone

# Create your models here.


class Player(models.Model):
    player = models.CharField(max_length=20)
    player_number = models.IntegerField(
        blank=True, null=True)
    theme = models.CharField(max_length=20, blank=True, null=True)
    score = models.IntegerField(
        default=0)
    difficulty = models.CharField(max_length=20, blank=True, null=True)
    completed_category = models.CharField(max_length=1000,
                                          default=',')
    q_status = models.CharField(max_length=10, default='new') # done, active, next 
    category = models.CharField(max_length=30, default=' ')
    question = models.CharField(max_length=1000, default=' ')
    answer = models.CharField(max_length=1000, default=' ')
    answer_a = models.CharField(max_length=1000, default=' ')
    answer_b = models.CharField(max_length=1000, default=' ')
    answer_c = models.CharField(max_length=1000, default=' ')
    answer_d = models.CharField(max_length=1000, default=' ')
    Date_started = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.player) + ': ' + str(self.id)


class GameData(models.Model):
    name = models.CharField(max_length=20, default='game')
    current_player = models.IntegerField(
        default=0)
    num_players = models.IntegerField(
        default=0)
    max_score = models.IntegerField(
        default=10)
    Date_started = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.name) + ': ' + str(self.num_players)
    
class CurrentQuestion(models.Model):
    name = models.CharField(max_length=20, default='game')
    category = models.CharField(max_length=30, blank=True, null=True)
    question = models.CharField(max_length=1000, blank=True, null=True)
    answer = models.CharField(max_length=1000, blank=True, null=True)
    answer_a = models.CharField(max_length=1000, blank=True, null=True)
    answer_b = models.CharField(max_length=1000, blank=True, null=True)
    answer_c = models.CharField(max_length=1000, blank=True, null=True)
    answer_d = models.CharField(max_length=1000, blank=True, null=True)

class PreQuestion(models.Model):
    name = models.CharField(max_length=20, default='game')
    pre_category = models.CharField(max_length=30, blank=True, null=True)
    pre_question = models.CharField(max_length=1000, blank=True, null=True)
    pre_answer = models.CharField(max_length=1000, blank=True, null=True)


class Question(models.Model):
    date = models.DateField(default=timezone.now)
    game_id = models.CharField(max_length=25, blank=True, null=True)
    question_id = models.CharField(max_length=25)
    player = models.CharField(max_length=20)
    category = models.CharField(max_length=30)
    difficulty = models.CharField(max_length=10)
    question = models.CharField(max_length=1000)
    answer = models.CharField(max_length=1000)
    wrong_answers = models.CharField(max_length=10000)

    def __str__(self):
        return str(self.player) + ': ' + str(self.question)
