import motor.motor_asyncio
from decouple import config

MONGO_DETAILS = config("MONGO_DETAILS_ATLAS")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS, connect=True)
database = client["ScoreSheet"]

auth_collection = database.get_collection("Auth")
players_collection = database.get_collection("Players")
groups_collection = database.get_collection("Groups")
games_collection = database.get_collection("Games")
