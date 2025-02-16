pipeline {
    agent any

    // tools {}
    // environment {}
    // options {}
    stages {
        stage('Installing Dependencies') {
            options { timestamps() }
            steps {
                script {
                // Angular + NodeJs + React + Svelte + vue.js
                 if (fileExists('package.json')) { sh 'npm install --no-audit' }
                // Django + Flask
                if (fileExists('requirements.txt')) { sh 'pip install --no-cache-dir -r requirements.txt' }
                // Golang
                 if (fileExists('go.mod')) { sh 'go mod download' }
                // SQLite
                if (fileExists('example.sqlite') || fileExists('db.sqlite3')) { sh 'pip3 install --no-cache-dir sqlite-web' }
                // Laravel + PHP 
                 if (fileExists('composer.json')) { sh 'composer install --no-interaction --prefer-dist' }
                // wordpress 
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
    }
}
