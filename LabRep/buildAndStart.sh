#!/bin/bash

docker-compose up -d
./mvnw wrapper:wrapper
./mvnw clean install
java -jar target/backendlabrep-0.0.1.jar
read -p "Press any key to continue..."
