import lcddriver
import time
import requests

display = lcddriver.lcd()
# probably move to an env or something later
ip = "192.168.1.230"


def display_message(message):
    display.lcd_clear()
    # TODO: determine if message needs to scroll
    display.lcd_display_string(message, 1)


def get_message(ip):
    # TODO: alter this function to be more robust + error handling
    api = "http://" + ip + ":8080/api/v1/messages/recent"
    r = requests.get(api)
    message = r.json()[0]["message"]
    return message


def main():
    message = get_message(ip)
    try:
        while True:
            display_message(message)
            # Turn on the light
            while True:
                # if button was pushed, then turn off light, then check for new message
                pass
    except KeyboardInterrupt:
        display.lcd_clear()


main()
