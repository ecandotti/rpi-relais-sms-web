def update_state(pin):
    if gpio.input(pin) == 0:
        gpio.output(pin, gpio.HIGH)
    else:
        gpio.output(pin, gpio.LOW)
