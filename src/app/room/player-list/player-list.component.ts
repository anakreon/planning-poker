import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../room.service';

export interface ChangeRoleRequest {
    playerId: string;
    role: string;
}

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
    @Input() public players: Player[];
    @Input() private currentPlayerId: string;
    @Input() public shouldShowVotes: boolean;
    @Input() public shouldShowMenu: boolean;
    @Output() changeRoleRequest: EventEmitter<ChangeRoleRequest> = new EventEmitter<ChangeRoleRequest>();

    public isCurrentPlayer (player: Player): boolean {
        return player.id === this.currentPlayerId;
    }

    public changeRole (request: ChangeRoleRequest): void {
        this.changeRoleRequest.emit(request);
    }
}
