import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from core.trivia_api import get_trivia

from .models import Player, CompletedCategory


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
        if message == 'Correct':
            player = Player.objects.filter(player=username).first()
            player.completed_category += difficulty
            player.completed_category += ','
            player.score = player.score + 1
            player.save()

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
