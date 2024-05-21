from machine import Pin, PWM
import network   #import des fonction lier au wifi
import urequests	#import des fonction lier au requetes http
import utime	#import des fonction lier au temps
import ujson	#import des fonction lier aà la convertion en Json
import time

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid = 'Van de surveillance DGSE #2'
password = "NeverGonnaGiveYouUp"
wlan.connect(ssid, password)
url = "http://192.168.190.108:3000/house"

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("online")
        leds = [PWM(Pin(18, mode = Pin.OUT)), PWM(Pin(17, mode = Pin.OUT)), PWM(Pin(16, mode = Pin.OUT))]
        
        houses = {
            "Gryffindor" : [255,0,0],
            "Slytherin" : [0,255,0],
            "Ravenclaw" : [0,0,255],
            "Hufflepuff" : [255,255,0],
            "" : [255,255,255]
        }
        
        # characters = ["harry-potter", "draco-malfoy", "luna-lovegood", "cedric-diggory"]
        
        # for c in characters :
        r = urequests.get(url)
        
        for i in leds :
            i.freq(1_000)
            i.duty_u16(0)

        def setColor (house) :
            for i in range(len(house)):
                leds[i].duty_u16(house[i]*256)

        setColor(houses[r.json()["message"]])
        
    except Exception as e:
        print(e)
    