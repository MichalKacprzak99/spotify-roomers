from django.test import TestCase, Client

from ..models import Room, generate_unique_code


class RoomTest(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        cls.client = Client()
        Room.objects.create(host=cls.client.session.session_key,
                            guest_can_pause=False,
                            votes_to_skip=1,
                            )

    def get_created_room(self) -> dict:
        rooms_in_database = self.client.get('/api/room').json()
        room_test = rooms_in_database[0]
        return room_test

    def test_creating_room_object(self):
        room_test = self.get_created_room()
        self.assertEqual(room_test.get('guestCanPause'), False)
        self.assertEqual(room_test.get('votesToSkip'), 1)
        self.assertEqual(room_test.get('host'), RoomTest.client.session.session_key)

    def test_generating_unique_code(self):
        room_test = self.get_created_room()
        unique_code_test = generate_unique_code()
        self.assertNotEqual(unique_code_test, room_test.get('code'))
