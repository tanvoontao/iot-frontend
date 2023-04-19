import mysql.connector
import serial
import json
import time

device = '/dev/ttyUSB0' 
arduino = serial.Serial(device, 9600)

mydb = mysql.connector.connect(
   host='localhost',
   user='pi',
   password='20020908',
   database='sensor_db'
) 

def detect_emergency(temp, hr):
    led_state = {'led_red': False, 'led_yellow': False, 'led_green': False}
    temp_case = get_temperature_case(temp)
    hr_case = get_hr_case(hr)

    if temp_case in [1, 3, 4] or hr_case in [1, 2, 5]:
        led_state['led_red'] = True
    elif temp_case in [2] or hr_case in [3, 4]:
        led_state['led_yellow'] = True
    elif temp_case == 0 and hr_case == 0:
        led_state['led_green'] = True

    return led_state


def get_temperature_case(temp):
    if temp <= 35:
        return 1  # Red LED: Hypothermia
    elif 35 < temp < 36.5:
        return 2  # Yellow LED: Mild hypothermia
    elif 36.5 <= temp < 37.5:
        return 0  # Green LED: Normal temperature
    elif 37.5 <= temp < 38:
        return 2  # Yellow LED: Mild fever
    elif 38 <= temp < 40:
        return 3  # Red LED: Fever
    elif temp >= 40:
        return 4  # Red LED: Hyperpyrexia


def get_hr_case(hr):
    if hr == 0:
        return 1  # Red LED: Cardiac arrest or sensor error (0 bpm)
    elif hr < 40:
        return 2  # Red LED: Severe bradycardia (< 40 bpm)
    elif 40 <= hr < 50:
        return 3  # Yellow LED: Mild bradycardia (40-49 bpm)
    elif 50 <= hr <= 100:
        return 0  # Green LED: Normal heart rate (50-100 bpm)
    elif 100 < hr <= 110:
        return 4  # Yellow LED: Mild tachycardia (101-110 bpm)
    else:
        return 5  # Red LED: Severe tachycardia (> 110 bpm)


def get_setting_from_db():
    time.sleep(1)
    mydb2 = mysql.connector.connect(
        host='localhost',
        user='pi',
        password='20020908',
        database='sensor_db'
    ) 
    with mydb2.cursor(dictionary=True) as cursor:
        cursor.execute('Select * FROM settings WHERE id=1;')
        result = cursor.fetchone()
        mydb2.close()
        # print(result)
        settings = {
            'age': result['age'],
            'b': result['buzzer_state'],
            'r': result['led_red_state'],
            'g': result['led_green_state'],
            'y': result['led_yellow_state'],
            'f': result['fall_detect_threshold'],
            'a': result['auto']
        }
        # print(settings)
        return settings if result else None

def update_settings(temp, hr):
    led_state = detect_emergency(temp, hr)
    with mydb.cursor() as cursor:
        update_sql = ('UPDATE settings SET led_red_state = %s, led_yellow_state = %s, led_green_state = %s WHERE id = 1')
        update_val = (led_state['led_red'], led_state['led_yellow'], led_state['led_green'])
        cursor.execute(update_sql, update_val)
        mydb.commit()


while True: 

    setting = get_setting_from_db()
    if setting is not None:
        arduino.write(str(setting).encode())
    
    while(arduino.in_waiting == 0): 
        pass 
    
    
    line = arduino.readline().decode().strip()
    
    
    
    values = json.loads(line)
    print(f'line: {values}')
    
    temperature = values['temperature']
    heart_rate = values['heart_rate']
    motion_detect = values['motion_detect']
    fall_detect = values['fall_detect']
    x = values['x']
    y = values['y']
    z = values['z']
    
    
    
    sql = 'INSERT INTO health_record (temperature, heart_rate, motion_detect, fall_detect, x, y, z) VALUES (%s, %s, %s, %s, %s, %s, %s)'
    val = (temperature, heart_rate, motion_detect, fall_detect, x, y, z)
    
    with mydb.cursor() as cursor:
        cursor.execute(sql, val)
        mydb.commit()
        print(cursor.rowcount, 'record inserted.')
    
    update_settings(temperature, heart_rate)
    
    
    