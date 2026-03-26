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

        stage('Deploy with Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    
                    sh 'kubectl apply -f /home/MachineMaster/devops_pipline/Kubernetes/'
                    sh 'kubectl rollout restart deployment ecole-back'
                    sh 'kubectl rollout restart deployment ecole-front'
                }
            }
        }
    }

}
