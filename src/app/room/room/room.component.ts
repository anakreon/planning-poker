import { Component } from '@angular/core';

interface Player {
    avatar: string;
    name: string;
}

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent {
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

    public cardOptions: number[] = [1, 2, 3, 5, 8, 13, 21, 34];

    public selectedCardValue: number = null;

    public selectCardValue (value: number): void {
        this.selectedCardValue = value;
    }

}
