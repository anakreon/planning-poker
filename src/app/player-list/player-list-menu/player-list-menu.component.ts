import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeRoleRequest, EvictionRequest } from '../player-list/player-list.component';
import { Constant } from '../../shared/constant.service';

@Component({
    selector: 'app-player-list-menu',
    templateUrl: './player-list-menu.component.html',
    styleUrls: ['./player-list-menu.component.css']
})
export class PlayerListMenuComponent {
    @Input() public playerId: string;
    @Input() public isCurrentPlayer: boolean;
    @Input() public currentRole: string;
    @Output() changeRoleRequest: EventEmitter<ChangeRoleRequest> = new EventEmitter<ChangeRoleRequest>();
    @Output() evictionRequest: EventEmitter<EvictionRequest> = new EventEmitter<EvictionRequest>();
    public allRoles;

    constructor (constant: Constant) {
        this.allRoles = Object.values(constant.playerRole);
    }

    public isCurrentRole (role: string): boolean {
        return role === this.currentRole;
    }

    public changeToRole (role: string): void {
        this.changeRoleRequest.emit({
            playerId: this.playerId,
            role
        });
    }

    public removePlayer (): void {
        this.evictionRequest.emit({
            playerId: this.playerId
        });
    }

}
