
class ExpressionHandler:

    MAPPING = {
        "bình_thường": "Sit still ",
        "cảm_ơn": "Thank",
        "xin_chào": "Hello",
        "yêu": "Love",
        "không": "No",
        "Hi": "hi",
        "Hello": "hello",
        "lol": "LOL",
        "ILY": "I love you",
        "Drink": "drink",
        "A": "A",
        "B": "B",
        "C": "C",
        "Apple": "apple",
        "Banana": "banana",
        "Bread": "bread",
        "Chicken": "chicken",
        "Day": "day",
        "month": "month",
        "Week": "week",
        "Year": "year",

    }

    def __init__(self):
        # Save the current message and the time received the current message
        self.current_message = ""

    def receive(self, message):
        self.current_message = message

    def get_message(self):
        return ExpressionHandler.MAPPING[self.current_message]
