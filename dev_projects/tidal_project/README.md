# Tidal Music - Take Home Assessment 

## AWS Configuration with terraform 
    - In the terraform config, I have laid out all the requirements for resources I needed to configure
    - I made the vpc_id a variable, and I am assuming that the subnets will be associated with the vpc that needs to be configured for the security groups
    - I kept the SSL certificate as is
    - I know in the instructions it mentioned not to configure the provider, but I did configure my provider for testing purposes to see if my security groups get configured into aws properly


## Docker Task
    - I decided for the docker task, I did both, where I kick-started a container containing the jar file and running it accordingly. I put the Dockerfile here: ./docker_task/java_service 
    - To test that, I built the image and tagged it with this command:
        docker build -t tidal-test .
    - Then using the tag tidal-test, I ran my application by running my docker container using this command:
        docker run -p 8080:80 -e NAME=Avi tidal-test
        - Here I map port 8080 to port 80, the port the image exposes.

    - After completing this part, I decided to do the optional challenge where I created a docker-compose file to configure my nginx proxy that will run in front of the java application

    - The proxy is hosted on port 80 and is mapped to port 80 of the nginx container
    - I created a simple nginx.config that sets a rule for the proxy to pass a call to the container running the java application
        - I set the worker_connections to it's default value of 1024, to handle that many connections to our service
    - To run the following services, I ran commands:
        1. docker-compose build 
        2. docker-compose up
        (To stop and remove the containers, I ran docker-compose down)
    
    
## Coding Challenge
    - I decided take up on the The Timer-o-botic challenge. I wrote my api in python using flask.
    
    - To calculate the wall-clock up-time of the application for any requests that came through my API, 
    I had set a global variable called startOfAppTime when the API got started, which is the time in which the app was started. To calculate the wall-clock up-time, I got the current real-time, through calling time.time() and subtracted the startOfAppTime from the current time.

    - To calculate the CPU time for processing requests, I had to consider a few things. First thing, I had considered the issue of having simultaneous requests and all of them trying to get the CPU time to calculate the requests. I was lucky that flask 1.0 by default takes requests simultaneously, so I didn't have to assign a thread to each request. However, I did have to use a semaphore to lock the variable that represents the CPU time for processing requests. I have a global variable called cpuTime, assigned initially as 0. For each request, I am always incrementing this value, by time.time() - startRequestTime, where startRequestTime is the variable representing the time recorded at the start of the request. I do this calculation after I set the current real-time, and the application wall-clock up time in my dictionary. The main thing I had to do here is locking the variable so that only one request at a time calculates the cpuTime, and then releases for other requests to increment to the cpuTime.

    - I also added a simple performance test script, that shoots off simultaneous requests to see how long it is taking to process all of the requests accordingly.

    - I ran this application using python3. To run the application I ran these commands accordingly:
        1. pip3 install -r requirements.txt
        2. pyton3 app.py 

