pipeline {
    agent any

    tools {
        nodejs 'nodejs-23.7.0'
        jdk 'openjdk-17' // for sonarqube
    }
    
    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-6.1.0.447'
    }

   // options {}

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
                } 
            }
        }
        
        stage('Dependency Scanning') {
            stage('OWASP Dependency Check') {
                        steps {
                          // check of all vulnerabilities (high, low, medium, critical)
                          dependencyCheck additionalArguments: '''
                            --scan \'./\' 
                            --out \'./\'  
                            --format \'ALL\' 
                            --disableYarnAudit \
                            --prettyPrint''', odcInstallation: 'owasp-depcheck-10'

                        // to fail the build if it found vulnerabilities that exceed the threshold
                        dependencyCheckPublisher failedTotalCritical: 1, pattern: 'dependency-check-report.xml', stopBuild: false

                        // to publish the HTML report in the UI of blue ocean
                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'dependency check HTML Report', reportTitles: '', useWrapperFileDirectly: true])

                        // to publish the test report in the UI of blue ocean
                        junit allowEmptyResults: true, keepProperties: true, stdioRetention: '', testResults: 'dependency-check-junit.xml'
                       }
                    }
        }

        stage('SAST - SonarQube') {
            steps {
                sh '''
                   java -version
                '''
                sh 'echo $SONAR_SCANNER_HOME'
                sh '''
                $SONAR_SCANNER_HOME/bin/sonar-scanner \
                   -Dsonar.projectKey=grad-project \
                   -Dsonar.sources=. \
                   -Dsonar.host.url=http://localhost:9000 \
                   -Dsonar.login=sqp_4e0224c2c2a423ba35784092cae93054f5993bd0
                '''
            }
        } 
    }
}
