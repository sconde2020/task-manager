pipeline {
    agent any

    tools {
        nodejs "node-22.16.0" // Déclaré dans Jenkins → Global Tool Configuration
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sconde2020/task-manager.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

/*         stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        } */

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
            }
        } 
    }

    post {
        always {
            echo 'Build terminé'
        }
    }
}
