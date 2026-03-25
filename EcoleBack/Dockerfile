# --- Stage 1: Build the JAR inside a container ---
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# 1. Copy the pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# 2. Copy the source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Create the final lightweight image ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# 3. Copy ONLY the finished JAR from the first stage
COPY --from=build /app/target/etude-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080
ENV SERVER_PORT=8080

ENTRYPOINT ["java","-jar","/app/app.jar"]