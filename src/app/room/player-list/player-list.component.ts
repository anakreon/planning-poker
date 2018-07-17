import { Component, Input } from '@angular/core';
import { Player } from '../room.service';


@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
    @Input() public players: Player[];
    @Input() private playerId: string;

    public isCurrentPlayer (player: Player): boolean {
        return player.id === this.playerId;
    }
}
