import { Component, Input } from '@angular/core';

interface Player {
    avatar: string;
    name: string;
}

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
    @Input('players') players: Player[];
}
