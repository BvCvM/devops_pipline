pipeline {
    agent any

    tools {
        maven 'Maven'      
        nodejs 'Node'   
    }


    stages {


        // Backend Part
        stage('Backend image build') {
            steps {
                dir('EcoleBack') {
                    sh 'mvn clean package -DskipTests'
                    sh 'docker build -t bassemamri/ecole-back:latest .'
                    sh 'docker push bassemamri/ecole-back:latest'
                }
            }
        }

        // Frontend Part
        stage('Frontend - Build image') {
            steps {
                dir('EcoleFront') {
                    sh 'docker build -t bassemamri/ecole-front:latest .'
                    sh 'docker push bassemamri/ecole-front:latest'
                }
            }
        }

        // ==================== DEPLOY ====================

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }

}
