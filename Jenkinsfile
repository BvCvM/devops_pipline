pipeline {
    agent any

    tools {
        maven 'Maven'      
        nodejs 'Node'   
    }


    stages {

        // Cleanup + clone Repo
        stage('CleanUp') {
            steps {
                deleteDir() // Clean the workspace before starting
            }
        }

        stage('Clone repository') {
            steps {
                sh 'git clone https://github.com/BvCvM/devops_pipline.git'
            }
        }

        // Backend Part
        stage('Backend image build') {
            steps {
                dir('EcoleBack') {
                    sh 'mvn clean package -DskipTests'
                    sh 'docker build -t ecole-back:latest .'
                    sh 'docker push ecole-back:latest'
                }
            }
        }

        // Frontend Part
        stage('Frontend - Build image') {
            steps {
                dir('EcoleFront') {
                    sh 'docker build -t ecole-front:latest .'
                    sh 'docker push ecole-front:latest'
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