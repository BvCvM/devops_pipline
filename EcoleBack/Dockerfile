FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# run as non-root
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# jar file dans un variable
ARG JAR_FILE=target/etude-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /app/app.jar

EXPOSE 8080
ENV SERVER_PORT=8080

ENTRYPOINT ["java","-jar","/app/app.jar"]