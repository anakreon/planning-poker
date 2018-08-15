import { Component, Input } from '@angular/core';
import { Player } from '../player-list/player-list.component';

@Component({
    selector: 'app-player-list-item',
    templateUrl: './player-list-item.component.html',
    styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent {
    @Input() public player: Player;
    @Input() public shouldShowVote: boolean;
    @Input() public shouldShowMenu: boolean;
}
