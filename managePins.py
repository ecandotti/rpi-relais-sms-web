import RPi.GPIO as gpio
import time
from signal import signal, SIGINT
from sys import exit

# Attribution des canaux aux GPIOs concernes
chanel1 = 4
chanel2 = 27
chanel3 = 22
chanel4 = 23
chanel5 = 24
chanel6 = 25

def handler(signal_received, frame):
    gpio.cleanup()
    exit(0)

def update_state(pin):
    if gpio.input(pin) == 0:
        gpio.output(pin, gpio.HIGH)
    else:
        gpio.output(pin, gpio.LOW)

def main():
    # Passage en mode BCM
    gpio.setmode(gpio.BCM)

    # Initialisation des pins en OUT
    gpio.setup(chanel1, gpio.OUT)
    gpio.setup(chanel2, gpio.OUT)
    gpio.setup(chanel3, gpio.OUT)
    gpio.setup(chanel4, gpio.OUT)
    gpio.setup(chanel5, gpio.OUT)
    gpio.setup(chanel6, gpio.OUT)

    # Boucle
    while True:
        update_state(chanel2)
        time.sleep(4)
        update_state(chanel2)
        time.sleep(4)


if __name__ == '__main__':
    signal(SIGINT, handler)
    main()
