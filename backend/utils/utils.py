def first(iterable, default=None):
    """
    Given a list of objects, iterable, returns the first element that matches the condition
    """
    for item in iterable:
        return item
    return default
