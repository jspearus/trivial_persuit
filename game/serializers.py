from rest_framework import serializers
from .models import *

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player 
        fields = ('id', 'player', 'player_number', 'score', 'difficulty', 'completed_category', 
                  'q_status', 'category', 'answer', 'answer_a',
                  'answer_b','answer_c', 'answer_d', 'Date_started')
        
        
class GameDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = GameData 
        fields = ('id', 'name', 'current_player', 'num_players', 
                  'max_score', 'Date_started')
        
        
class CurrentQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = CurrentQuestion 
        fields = ('id', 'name', 'category', 'question', 'answer', 
                  'answer_a','answer_b','answer_c', 'answer_d')
        
        
class PreQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PreQuestion
        fields = ('id', 'name', 'pre_category', 'pre_question', 'pre_answer')
        
        
class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question 
        fields = ('id', 'date', 'game_id', 'question_id', 
                  'player', 'category', 'difficulty', 'question',
                  'answer','wrong_answers')