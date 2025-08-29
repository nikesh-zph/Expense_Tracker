FROM ubuntu:latest
LABEL authors="nikesh-mishra"

# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk
# Set working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/expense_tracker_backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
