from django.shortcuts import render, redirect
from core.trivia_api import get_trivia
from .models import Player, GameData
import random

questions = []
catagories = ['general_knoladge', 'sciences', 'history', 'arts_and_literatures',
              'film_and_tv', 'food_and_drinks', 'geography', 'music',
              'society_and_culture', 'sport_and_leisure']


# Create your views here.


def update_current_player(value):
    gameData = GameData.objects.filter(name='game').first()
    gameData.current_player += 1
    if gameData.current_player > gameData.num_players:
        gameData.current_player = 1
    gameData.save()
    print(f"Current Player: {gameData.current_player}")
    print(f"Nunmber Players: {gameData.num_players}")


def index(request):
    return render(request, 'index.html', {

    })


def join(request):
    gameData = GameData.objects.filter(name='game').first()
    if request.method == "POST":
        name = request.POST['player_name']
        diff = request.POST['diff']
        if not Player.objects.filter(player=name).exists():
            gameData.num_players += 1
            gameData.save()
            Player.objects.create(
                player=name, player_number=gameData.num_players, difficulty=diff)
        return redirect(f'/question/{name}')
    return render(request, 'join.html', {})


def question(request, name):
    gameData = GameData.objects.filter(name='game').first()
    global questions, catagories
    cat = random.sample(range(10), 10)
    category = catagories[cat[0]]
    player = Player.objects.filter(player=name).first()
    diff = player.difficulty
    trivia_data = get_trivia(diff, category, '10')
    question_id = trivia_data[0]['id']
    category = trivia_data[0]['category']
    question = trivia_data[0]['question']
    answer = trivia_data[0]['correctAnswer']
    answers = trivia_data[0]['incorrectAnswers']
    answers.append(answer)
    random.shuffle(answers, random.random)
    answera = trivia_data[0]['incorrectAnswers'][0]
    answerb = trivia_data[0]['incorrectAnswers'][1]
    answerc = trivia_data[0]['incorrectAnswers'][2]
    answerd = trivia_data[0]['incorrectAnswers'][3]
    return render(request, 'question.html', {
        'name': name,
        'question_id': player.player_number,
        'current_player': gameData.current_player,
        'diff': diff,
        'category': category,
        'question': question,
        'answera': answera,
        'answerb': answerb,
        'answerc': answerc,
        'answerd': answerd,
        'answer': answer,
    })


def result(request):
    trivia_data = get_trivia('hard', 'history', '1')
    category = trivia_data[0]['category']
    question = trivia_data[0]['question']
    answer = trivia_data[0]['correctAnswer']
    return render(request, 'question.html', {
        'category': category,
        'question': question,
        'answer': answer,
        'result': result,
    })


def dash(request):
    playerlist = []
    players = Player.objects.all()
    gameData = GameData.objects.filter(name='game').first()

    return render(request, 'dash.html', {
        'players': players,
        'num_players': gameData.num_players,
    })
