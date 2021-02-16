FROM openjdk:8

ENV NAME='unknown'
ENV SERVER_PORT=80 
WORKDIR /tidalJavaApp
COPY ./gs-spring-boot-0.1.0.jar .

CMD ["java", "-jar", "gs-spring-boot-0.1.0.jar"]
EXPOSE $SERVER_PORT
