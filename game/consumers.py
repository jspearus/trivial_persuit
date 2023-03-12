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
        username = text_data_json['username']
        data_type = text_data_json['data_type']
        data = text_data_json['data']
        # player = Player.objects.filter(player=username).first()
        # gameData = GameData.objects.filter(name='game').first()
                
        if data_type == 'test':
            username = username
            data = 'rec...test'
            data_type = data_type

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_message',
                'username': username,
                'data_type': data_type,
                'data': data,
            }
        )

    def game_message(self, event):
        username = event['username']
        data_type = event['data_type']
        data = event['data']

        self.send(text_data=json.dumps({
            'username': username,
            'data_type': data_type,
            'data': data,

        }))

    # def disconnect(self, close_code):
    #     pass
