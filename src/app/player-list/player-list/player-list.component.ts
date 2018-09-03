import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ChangeRoleRequest {
    playerId: string;
    role: string;
}

export interface EvictionRequest {
    playerId: string;
}

export interface Player {
    id: string;
    name: string;
    role: string;
    vote: string;
    status: boolean;
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
    @Output() evictionRequest: EventEmitter<EvictionRequest> = new EventEmitter<EvictionRequest>();

    public isCurrentPlayer (player: Player): boolean {
        return player.id === this.currentPlayerId;
    }

    public changeRole (request: ChangeRoleRequest): void {
        this.changeRoleRequest.emit(request);
    }

    public removePlayer (request: EvictionRequest): void {
        this.evictionRequest.emit(request);
    }
}
