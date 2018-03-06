FROM openjdk:alpine
MAINTAINER Antoine Rey <antoine.rey@free.fr>
# Spring Boot application creates working directories for Tomcat by default
VOLUME /tmp
ADD utecTest.war utecTest.war
RUN sh -c 'touch /utecTest.war'
# To reduce Tomcat startup time we added a system property pointing to "/dev/urandom" as a source of entropy.
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/utecTest.jar"]
