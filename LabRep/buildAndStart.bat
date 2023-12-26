docker-compose up -d
mvn package
call java -jar target/backendlabrep-0.0.1.jar
call pause
@REM docker compose down

@REM docker-compose -f docker-compose.yml up --build
