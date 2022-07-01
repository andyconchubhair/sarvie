# SARVIE

To test locally, references to hosting location need to be changed to localhost. Search for the lines to be uncommented by searching for "LOCAL MACHINE" in in Dockerfile & main.js. 

Before implementing in Production, be sure to revert to the PRODUCTION commmented code.

## Deployment

### Deploying as a local standalone node server (See edits in real-time)
* npm start

### Deploying as a local QA Docker Image (communicating with local backend servers)
* docker-compose build
* docker-compose up -d //-d runs in detached mode so it doesnt bind to the cli

### Deploying as a Prod Docker Image to Google Cloud Platform
https://cloud.google.com/build/docs/running-builds/start-build-command-line-api
https://cloud.google.com/sdk/gcloud/reference/run/deploy
https://cloud.google.com/load-balancing/docs/https/setup-global-ext-https-serverless#console_1
* Change dockerfile and gridrefUrl on main.js
* gcloud auth login
* gcloud projects list
* gcloud config set project sarv-319519
* gcloud builds submit --tag gcr.io/sarv-319519/sarv
* gcloud run deploy sarv --image gcr.io/sarv-319519/sarv
* https://
* IP: 
* https://sarv.ie

### Committing updates to Git
* A git repository is generally first defined by the directory (working tree) that contains the .git directory
* As the git grows in complexity, it may contain branches from multiple sources that are not present in a single working tree
* Remote repo is added as an origin: https://github.com/andyconchubhair/sarvie.git

Add files to the staging area for commit with `git add .`
See what files are staged with `git status`
Commit changes made to you local git repo. The message in the " " is given so that the other users can read the message and see what changes you made `git commit -m "change summary"`
If you committed changes in error, unstage files with `git reset HEAD~1`
push project code from local repo to <remote repo> at <branch> with `git push -u origin main`