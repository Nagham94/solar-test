pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'nagham94' 
        GIT_REPO_URL = 'https://github.com/Nagham94/pizza-app2.git'
        IMAGE_TYPE = "backend" // "frontend" or "database" or "backend" will be used in the image name  
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git credentialsId: 'github_token', url: "${GIT_REPO_URL}"
                    // Set GIT_COMMIT variable
                    env.GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    sh "echo Checked out commit: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'printenv'

                    def imageName = "${DOCKER_HUB_REPO}/${IMAGE_TYPE}:${env.GIT_COMMIT}"
                    sh """
                        docker build -t ${imageName} .
                        echo "Built Docker image: ${imageName}"
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                        def imageName = "${DOCKER_HUB_REPO}/${IMAGE_TYPE}:${env.GIT_COMMIT}"
                        sh """
                        docker push ${imageName}
                        echo "Pushed Docker image: ${imageName}"
                        """
                }
            }
        }
    }
}


