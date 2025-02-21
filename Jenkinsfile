pipeline {
    agent any

    tools {
        nodejs 'nodejs-23.7.0'
        jdk 'openjdk-17'
    }
    
    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-6.1.0.447'
    }

    stages {
        stage('Installing Dependencies') {
            options { timestamps() }
            steps {
                script {
                    // Angular + NodeJs + React + Svelte + Vue.js
                    if (fileExists('package.json')) { 
                        sh 'npm install --no-audit' 
                    }
                    
                    // Django + Flask
                    if (fileExists('requirements.txt')) { 
                        sh 'pip install --no-cache-dir -r requirements.txt' 
                    }
                    
                    // Golang
                    if (fileExists('go.mod')) { 
                        sh 'go mod download' 
                    }
                    
                    // SQLite
                    if (fileExists('example.sqlite') || fileExists('db.sqlite3')) { 
                        sh 'pip3 install --no-cache-dir sqlite-web' 
                    }
                    
                    // Laravel + PHP 
                    if (fileExists('composer.json')) { 
                        sh 'composer install --no-interaction --prefer-dist' 
                    }
                    
                    // WordPress 
                    if (fileExists('wp-config.php')) { 
                        sh '''
                        apt-get update && apt-get install -y \
                        libpng-dev \
                        libjpeg-dev \
                        libfreetype6-dev && \
                        docker-php-ext-configure gd --with-freetype --with-jpeg && \
                        docker-php-ext-install gd && \
                        apt-get clean && rm -rf /var/lib/apt/lists/*
                        '''
                    }
                    sh '''
                      java -version
                    '''
                } 
            }
        }

        stage('SAST - SonarQube') {
            steps {
                sh '''
                $SONAR_SCANNER_HOME/bin/sonar-scanner \
                -Dsonar.projectKey=grad-project \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=sqp_29a9e875d0f356d9d68b052da107ff8142d9e05f
                '''
            }
        } 
    }
}
