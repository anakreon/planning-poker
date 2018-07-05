import { Component, Input } from '@angular/core';

export interface Player {
    avatar: string;
    name: string;
    status: 'online' | 'offline';
}

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
    @Input('players') players: Player[];
}
