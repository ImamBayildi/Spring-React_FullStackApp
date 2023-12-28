docker-compose up -d
call mvn wrapper:wrapper
call ./mvnw clean install
call java -jar target/backendlabrep-0.0.1.jar
call pause
