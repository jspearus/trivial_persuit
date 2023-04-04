from django.shortcuts import render, redirect
from core.trivia_api import get_trivia
from rest_framework import viewsets, filters
from .serializers import  *
from .models import Player, GameData, Question, CurrentQuestion, PreQuestion
import random
import socket

# Create your views here.

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    search_fields = ['player', 'category', 'difficulty', 'completed_category']
    filter_backends = (filters.SearchFilter,)
    
class GameDataView(viewsets.ModelViewSet):
    serializer_class = GameDataSerializer
    queryset = GameData.objects.all()
    search_fields = ['name', 'current_player', 'num_players', 'max_score', 'Date_started']
    filter_backends = (filters.SearchFilter,)
    
class CurrentQuestionView(viewsets.ModelViewSet):
    serializer_class = CurrentQuestionSerializer
    queryset = CurrentQuestion.objects.all()
    search_fields = ['name', 'category', 'question', 'answer']
    filter_backends = (filters.SearchFilter,)
    
class PreQuestionView(viewsets.ModelViewSet):
    serializer_class = PreQuestionSerializer
    queryset = PreQuestion.objects.all()
    search_fields = ['player', 'pre_category', 'pre_question', 'pre_answer']
    filter_backends = (filters.SearchFilter,)
    
class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    search_fields = ['player', 'category', 'difficulty', 'question', 'answer']
    filter_backends = (filters.SearchFilter,)

def index(request):
    return render(request, 'index.html', {

    })
        

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP
