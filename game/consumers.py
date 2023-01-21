import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from core.trivia_api import get_trivia

from .models import Player, GameData
from .views import update_current_player


class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'game'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        difficulty = text_data_json['difficulty']
        player = Player.objects.filter(player=username).first()
        if message == 'Correct':
            if player.completed_category == 'None':
                player.completed_category = ''
            player.completed_category += difficulty
            player.completed_category += ','
            player.score = player.score + 1
            if player.score > 2:
                print(f"{username}: WON!!!")
                message = "WON!!!!!"
            player.save()
            update_current_player(1)

        elif message == 'Incorrect':
            update_current_player(1)

        elif message == 'game':
            if difficulty == 'reset':
                players = Player.objects.all()
                players.delete()
                gameData = GameData.objects.filter(name='game').first()
                gameData.num_players = 0
                gameData.current_player = 1
                gameData.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': message,
                'username': username,
                'difficulty': difficulty,
            }
        )

    def game_message(self, event):
        message = event['message']
        username = event['username']
        difficulty = event['difficulty']

        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'difficulty': difficulty,

        }))

    # def disconnect(self, close_code):
    #     pass
