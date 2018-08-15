# Planning Poker

Planning (Scrum) poker application based on Angular.
Players can vote on user stories, moderator can flip the cards at the end of the voting period to show the results.
Pure SPA without a backend, uses Firebase for synchronization.


## Getting Started

This is an Angular CLI-based app. Use instructions for building using Angular CLI.

### Prerequisites

- A Firebase project
- Internet connection


### Installing

- add your Firebase credentials to 'src/app/environments/environment.ts' and the prod version
- use ```npm install``` to install all project-specific dependencies (you might need to install @angular/cli package separately)
- run ```ng serve``` to start a local development server


## Deployment

- ```ng build --prod``` will create a production version of the project in 'dist' folder
- to deploy using 'rsync', configure 'src/app/environments/serversettings.json' and run ```npm run deploy``` to deploy


## Built With

* [Angular](https://angular.io/) - Framework
* [Firebase](https://firebase.google.com/) - Database and client synchronization
* [AngularFire2](https://github.com/angular/angularfire2) - A bridge between Angular and Firebase


## Authors

* **Martin Hula** - *Initial work* - [anakreon](https://github.com/anakreon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
