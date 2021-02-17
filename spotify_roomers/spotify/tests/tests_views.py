from django.test import TestCase


class AuthUrlTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = '/spotify/get-auth-url'

    def test_create_authentication_url(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

