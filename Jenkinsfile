pipeline {
    agent any

    tools {
        maven 'Maven'      
        nodejs 'Node' 
        jdk 'LocalJDK17'
    }


    stages {


        // Backend Part
        stage('Backend image build') {
            steps {
                dir('EcoleBack') {
                    sh 'mvn clean package -DskipTests'
                    sh 'docker build -t bassemamri/ecoleback-app:latest .'
                    sh 'docker push bassemamri/ecoleback-app:latest'
                }
            }
        }

        // Frontend Part
        stage('Frontend - Build image') {
            steps {
                dir('EcoleFront') {
                    sh 'docker build -t bassemamri/ecolefront-app:latest .'
                    sh 'docker push bassemamri/ecolefront-app:latest'
                }
            }
        }

        // ==================== DEPLOY ====================

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f Kubernetes/pvc.yaml'
                    sh 'kubectl apply -f Kubernetes/database.yaml'
                    sh 'kubectl apply -f Kubernetes/backend.yaml'
                    sh 'kubectl apply -f Kubernetes/frontend.yaml'
                    sh 'kubectl rollout restart deployment/backend'
                    sh 'kubectl rollout restart deployment/frontend'
                }
            }
        }
    }

}
