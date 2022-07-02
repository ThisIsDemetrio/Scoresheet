import hashlib
import uuid


def first(iterable, default=None):
    """
    Given a list of objects, iterable, returns the first element that matches the condition
    """
    for item in iterable:
        return item
    return default


def hashString(string: str) -> str:
    """
    Hash a string
    """
    return hashlib.md5(string.encode("utf-8")).hexdigest()


def generateUuid4() -> str:
    """
    Generate a uuid to be used as id
    """
    return uuid.uuid4()
