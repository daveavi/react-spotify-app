from datetime import datetime
from flask import Flask

import time
import json
import threading 


app = Flask(__name__) 

startOfAppTime = time.time()
cpuTime = 0
sem = threading.Semaphore()


@app.route('/uptime')
def upTime():
    global cpuTime, sem
    startRequestTime = time.time() 
    
    timeDataObj = getTime() 
    
    sem.acquire()
    cpuTime += (time.time() - startRequestTime)
    timeDataObj['cpuTime'] = cpuTime
    sem.release()

    return json.dumps(timeDataObj)


def getTime():

    timeDataObj = {}
    
    currAppTime = getCurrAppTime()
    currTime = getCurrTime()
    
    timeDataObj['totalAppRunTime'] = currAppTime
    timeDataObj['currentTime'] = currTime
    

    return timeDataObj



def getCurrAppTime():
    return time.time() - startOfAppTime

def getCurrTime():
    return str(datetime.now())


if __name__ == '__main__': 
    app.run(debug=True, host='0.0.0.0')