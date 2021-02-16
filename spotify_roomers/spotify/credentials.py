import os

from dotenv import load_dotenv, find_dotenv

from enum import Enum


load_dotenv(find_dotenv())


class Credentials(Enum):
    """
    Enum used for storing environment variables
    """
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')
    REDIRECT_URI = os.getenv('REDIRECT_URI')

    def __str__(self) -> str:
        return str(self.value)
