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
// Check if the commit is from a developer or ArgoCD Image Updater
        stage('Check Commit Origin') {
            steps {
                script {
                    def commitMsg = sh(script: "git log -1 --pretty=format:'%s'", returnStdout: true).trim()
                    def changedFiles = sh(script: "git diff --name-only HEAD~1 HEAD || echo ''", returnStdout: true).trim()

                    // Skip if commit message matches Image Updater pattern
                    // Actual message: "build: auto-update image ecole-app [ci skip]"
                    if (commitMsg.contains('auto-update image') || commitMsg.contains('[ci skip]')) {
                        currentBuild.result = 'NOT_BUILT'
                        error("Skipping: commit is from ArgoCD Image Updater (${commitMsg})")
                    }

                    if (changedFiles && changedFiles.split('\n').every { it.startsWith('Kubernetes/') }) {
                        currentBuild.result = 'NOT_BUILT'
                        error("Skipping: only Kubernetes manifest changes detected (likely Image Updater)")
                    }

                    echo "Commit is from a developer — proceeding with build"
                }
            }
        }





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
