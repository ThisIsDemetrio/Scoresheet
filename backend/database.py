import motor.motor_asyncio
from decouple import config

MONGO_DETAILS = config("MONGO_DETAILS")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.ScoreSheet

players_collection = database.get_collection("Players")
groups_collection = database.get_collection("Groups")
games_collection = database.get_collection("Games")
