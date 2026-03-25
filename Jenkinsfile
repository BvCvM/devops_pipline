pipeline {
    agent any

    tools {
        maven 'Maven'      
        nodejs 'Node'   
        jdk 'JDK-env'
    }


    stages {


        // Backend Part
        stage('Backend image build') {
            steps {
                dir('EcoleBack') {
                    bat 'mvn clean package -DskipTests'
                    bat 'docker build -t bassemamri/ecole-back:latest .'
                    bat 'docker push bassemamri/ecole-back:latest'
                }
            }
        }

        // Frontend Part
        stage('Frontend - Build image') {
            steps {
                dir('EcoleFront') {
                    bat 'docker build -t bassemamri/ecole-front:latest .'
                    bat 'docker push bassemamri/ecole-front:latest'
                }
            }
        }

        // ==================== DEPLOY ====================

        stage('Deploy with Docker Compose') {
            steps {
                bat 'docker compose down || true'
                bat 'docker compose up -d'
            }
        }
    }

}
