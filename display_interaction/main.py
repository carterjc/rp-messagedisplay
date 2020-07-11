import lcddriver
import time
import requests

display = lcddriver.lcd()


def display_message(message):
    # TODO: determine if message needs to scroll
    display.lcd_display_string(message, 1)


def get_message():
    api = "https://localhost:8080/api/v1/messages/recent"
    r = requests.get(api)
    message = r.json()["message"]
    return message


def main():
    try:
        while True:
            print("Writing to display")
            display_message("Hello, World!")

    except KeyboardInterrupt:
        display.lcd_clear()


main()
