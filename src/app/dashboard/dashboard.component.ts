import { Component } from '@angular/core';

interface Player {
    avatar: string;
    name: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public players: Player[] = [{
        name: 'person One',
        avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }, {
        name: 'person Two',
        avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }, {
        name: 'person Three',
        avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }, {
        name: 'person Four',
        avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }];
}
