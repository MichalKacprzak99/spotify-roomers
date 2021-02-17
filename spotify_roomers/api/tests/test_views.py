from django.test import TestCase, Client

from ..models import Room


class RoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/room'
        number_of_room = 10
        for _ in range(number_of_room):
            cls.client = Client()
            Room.objects.create(host=cls.client.session.session_key)

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_lists_all_rooms(self):
        response = self.client.get(self.url)
        rooms_test = response.json()
        self.assertEqual(len(rooms_test), 10)


class CreateRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/create-room'

    def test_create_new_room(self):
        response = self.client.post(self.url,
                                    data={'guest_can_pause': True,
                                          'votes_to_skip': 5},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_update_room(self):
        Room.objects.create(host=self.client.session.session_key)

        response = self.client.post(self.url,
                                    data={'guest_can_pause': True,
                                          'votes_to_skip': 5},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_create_new_room_with_invalid_data(self):
        response = self.client.post(self.url,
                                    data={'guest_can_pause': None,
                                          'votes_to_skip': None},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)


class GetRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/get-room'

    def test_get_room(self):
        room = Room.objects.create(host=self.client.session.session_key)
        response = self.client.get(self.url, data={'code': room.code})
        self.assertEqual(response.status_code, 200)

    def test_get_room_invalid_room_code(self):
        response = self.client.get(self.url, data={'code': ""})
        self.assertEqual(response.status_code, 401)

    def test_get_room_no_room_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)


class JoinRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/join-room'

    def test_join_room(self):
        room = Room.objects.create(host=self.client.session.session_key)
        response = self.client.post(self.url, data={'code': room.code})
        self.assertEqual(response.status_code, 200)

    def test_join_room_invalid_room_code(self):
        response = self.client.post(self.url, data={'code': ""})
        self.assertEqual(response.status_code, 401)

    def test_join_room_no_room_code(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 400)


class UserInRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/user-in-room'

    def test_user_in_room(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)


class LeaveRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/leave-room'

    def test_user_in_room(self):
        room = Room.objects.create(host=self.client.session.session_key)
        self.client.post('/api/join-room', data={'code': room.code})
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)


class UpdateRoomViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/api/update-room'

    def test_update_room(self):
        room = Room.objects.create(host=self.client.session.session_key)
        response = self.client.patch(self.url,
                                     data={'code': room.code,
                                           'votes_to_skip': room.votes_to_skip,
                                           'guest_can_pause': room.guest_can_pause,
                                           },
                                     content_type='application/json')

        self.assertEqual(response.status_code, 200)

    def test_update_room_invalid_room_code(self):
        room = Room.objects.create(host="test_session_key")
        response = self.client.patch(self.url,
                                     data={'code': "invalid_code",
                                           'votes_to_skip': room.votes_to_skip,
                                           'guest_can_pause': room.guest_can_pause,
                                           },
                                     content_type='application/json')

        self.assertEqual(response.status_code, 404)

    def test_update_room_no_host(self):
        room = Room.objects.create(host="test_session_key")
        response = self.client.patch(self.url,
                                     data={'code': room.code,
                                           'votes_to_skip': room.votes_to_skip,
                                           'guest_can_pause': room.guest_can_pause,
                                           },
                                     content_type='application/json')

        self.assertEqual(response.status_code, 403)

    def test_update_room_invalid_data(self):
        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, 400)
