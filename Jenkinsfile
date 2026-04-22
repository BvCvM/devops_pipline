pipeline {
    agent any

    tools {
        maven 'Maven'      
        nodejs 'Node' 
        jdk 'LocalJDK17'
    }
    environment {
    IMAGE_TAG = "build-${BUILD_NUMBER}"
    }



    stages {


        stage('SonarQube Analysis') {
            steps {
                dir('EcoleBack') {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        sh '''
                        mvn clean verify -DskipTests sonar:sonar \
                          -Dsonar.projectKey=devops_pipline_scan \
                          -Dsonar.host.url=http://4.233.148.62:9000 \
                          -Dsonar.token=$SONAR_TOKEN
                        '''
                    }
                }            
            }
        }

        // Backend Part
        stage('Backend image build') {
            steps {
                dir('EcoleBack') {
                    sh 'mvn clean package -DskipTests'
                    sh "docker build -t bassemamri/ecoleback-app:${IMAGE_TAG} ."
                    sh "docker push bassemamri/ecoleback-app:${IMAGE_TAG}"
                }
            }
        }

        // Frontend Part
        stage('Frontend - Build image') {
            steps {
                dir('EcoleFront') {
                    sh "docker build -t bassemamri/ecolefront-app:${IMAGE_TAG} ."
                    sh "docker push bassemamri/ecolefront-app:${IMAGE_TAG}"
                }
            }
        }

    
        }

}
