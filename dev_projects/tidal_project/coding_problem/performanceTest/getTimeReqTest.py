import random, string, subprocess
import time

requests = 450

processes = []

t = time.time()
initReq = "Initializing {} requests".format(requests)
print(initReq)
for i in range(requests):

	request= "http://0.0.0.0:5000/uptime" 
	p = subprocess.Popen(["curl", request], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
	processes.append(p)

for cp in processes:
	cp.wait()

reqResults = "{} GET requests took {}s to execute".format(requests, int(time.time() - t))
print(reqResults)