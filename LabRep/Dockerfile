# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk-jammy as base
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve
COPY src ./src

FROM base as development
CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=mssql"]

FROM base as build
RUN ./mvnw package

FROM eclipse-temurin:17-jre-jammy as production
EXPOSE 8080
COPY --from=build /target/backendlabrep-*.jar /backendlabrep.jar
CMD ["java", "-jar", "/backendlabrep.jar"]




# , "-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000'"



# FROM openjdk:11
# ADD target/xx.jar xx.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","/xx.jar"]




# # syntax=docker/dockerfile:1

# FROM eclipse-temurin:17-jdk-jammy

# WORKDIR /app

# # İlk parametre hangi dosyaları kopyalayacağım, ikincisi ise nereye kopyalayacağım. (/app)
# COPY .mvn/ .mvn
# COPY mvnw pom.xml ./

# RUN ./mvnw dependency:resolve

# # geçerli dizindeki dosyaları image'e kopyala
# COPY src ./src

# CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=mssql"]

# # docker run --publish 8080:8080 java-docker:labrep
# # docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Strong-password123" -e "MSSQL_PID=Express" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
# # docker run --rm -d --name springboot-server --network mssqlnet -e MSSQL_URL="jdbc:sqlserver://sql-server-db:1433;databaseName=DBlabReport;integratedSecurity=false;encrypt=true;trustServerCertificate=true;" -p 8080:8080 java-docker:mssqllabrep