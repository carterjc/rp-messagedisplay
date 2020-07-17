import lcddriver
import time
import requests
import RPi.GPIO as GPIO
from constants import *

display = lcddriver.lcd()


def display_message(message):
    display.lcd_clear()
    # TODO: determine if message needs to scroll
    display.lcd_display_string(message, 1)


def get_message(ip):
    while True:
        api = "http://" + ip + ":8080/api/v1/messages/recent"
        try:
            r = requests.get(api)
            r.raise_for_status()
        except requests.exceptions.HTTPError as errh:
            print("Http Error:", errh)
            continue
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)
            continue
        except requests.exceptions.Timeout as errt:
            print("Timeout Error:", errt)
            continue
        except requests.exceptions.RequestException as err:
            print("OOps: Something Else", err)
            continue
        if len(r.json()) == 0:
            continue
        message = r.json()[0]
        if message["times_used"] > 0:
            time.sleep(60)
            continue
        log_action(IP, "fetched", message["message_id"])
        return message


def setup_gpio(lpin, bpin):
    # Sets up board
    GPIO.setmode(GPIO.BOARD)
    # Sets up light
    GPIO.setup(lpin, GPIO.OUT)
    light_toggle(lpin, 0)
    # Sets up button
    GPIO.setup(bpin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def cleanup():
    # Clears LCD display
    display.lcd_clear()
    # Resets ports used (ie light port)
    GPIO.cleanup()


def light_toggle(pin, value):
    GPIO.output(pin, value)


def message_used(message):
    api = "http://" + IP + ":8080/api/v1/messages/update/" + str(message["message_id"])
    message_data = {
        "message": message["message"],
        "times_used": message["times_used"] + 1,
        "date_for": message["date_for"]
    }
    requests.post(api, message_data)


def log_action(ip, action, message_id):
    api = "http://" + ip + ":8080/api/v1/actions/"
    action_data = {
        "action_log": action,
        "message_id": message_id
    }
    requests.post(api, action_data)


def main():
    setup_gpio(LIGHT_PIN, BUTTON_PIN)
    # Get initial message
    message = get_message(IP)
    try:
        while True:
            display_message(message["message"])
            # Turn on the light
            light_toggle(LIGHT_PIN, 1)
            while True:
                # if button was pushed, then turn off light
                if GPIO.input(BUTTON_PIN) == 1:
                    light_toggle(LIGHT_PIN, 0)
                    display_message("Successfully read :)")
                    time.sleep(5)
                    display_message("")
                    log_action(IP, "read", message["message_id"])
                    message_used(message)
                    break
            # Check for new message
            get_message(IP)
    except KeyboardInterrupt:
        cleanup()
    cleanup()


main()
