from django.shortcuts import render, redirect
from core.trivia_api import get_trivia
from .models import Player, GameData, Question
import random
import socket

questions = []
catagories = {"Geography": "geography",
              "Film & TV": "film_and_tv",
              "Music": "music",
              "History": "history",
              "Arts & Literature": "arts_and_literature",
              "Science": "science",
              "Sport & Leisure": "sport_and_leisure",
              "Society & Culture": "society_and_culture",
              "General Knowledge": "general_knowledge",
              "Food & Drink": "food_and_drink"}


# Create your views here.


def update_current_player(value):
    gameData = GameData.objects.filter(name='game').first()
    gameData.current_player += 1fff
    if gameData.current_player > gameData.num_players:
        gameData.current_player = 1
    gameData.save()


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


def question_filter(comp_cat, diff, player):
    global questions, catagories
    i = 0
    new_cat = []
    category_list = list(catagories.keys())
    for cat in category_list:
        if cat not in comp_cat:
            new_cat.append(cat)
    if len(new_cat) > 1:
        cat = random.randint(0, len(new_cat)-1)
    else:
        cat = 0
    trivia_data = get_trivia(diff, catagories[new_cat[cat]], '20')
    for q in range(20):
        if not Question.objects.filter(question_id=trivia_data[q]['id']):
            question = Question.objects.create(
                question_id=trivia_data[q]['id'],
                player=player,
                category=trivia_data[q]['category'],
                difficulty=diff,
                question=trivia_data[q]['question'],
                answer=trivia_data[q]['correctAnswer'],
                wrong_answers=trivia_data[q]['incorrectAnswers']
            )
            question.save()
            i = q
            break
    return trivia_data[i]


def question(request, name):
    global questions, catagories
    gameData = GameData.objects.filter(name='game').first()
    player = Player.objects.filter(player=name).first()

    comp_cat = player.completed_category.split(',')
    for cat in comp_cat:
        if cat == '':
            comp_cat.remove(cat)

    trivia_data = question_filter(comp_cat, player.difficulty, player.player)

    question_id = trivia_data['id']
    category = trivia_data['category']
    question = trivia_data['question']
    answer = trivia_data['correctAnswer']
    answers = trivia_data['incorrectAnswers']
    answers.append(answer)
    random.shuffle(answers, random.random)
    answera = trivia_data['incorrectAnswers'][0]
    answerb = trivia_data['incorrectAnswers'][1]
    answerc = trivia_data['incorrectAnswers'][2]
    answerd = trivia_data['incorrectAnswers'][3]
    return render(request, 'question.html', {
        'name': name,
        'question_id': player.player_number,
        'current_player': gameData.current_player,
        'diff': player.difficulty.capitalize(),
        'score': player.score,
        'slices': player.completed_category,
        'category': category,
        'question': question.capitalize(),
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


def dash(request):
    playerlist = []
    players = Player.objects.all()
    gameData = GameData.objects.filter(name='game').first()
    IPAddr = get_ip()
    return render(request, 'dash.html', {
        'players': players,
        'num_players': gameData.num_players,
        'max_score': gameData.max_score,
        'address': IPAddr,
    })
