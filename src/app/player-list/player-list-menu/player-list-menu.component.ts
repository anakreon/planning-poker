import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeRoleRequest } from '../player-list/player-list.component';

@Component({
    selector: 'app-player-list-menu',
    templateUrl: './player-list-menu.component.html',
    styleUrls: ['./player-list-menu.component.css']
})
export class PlayerListMenuComponent {
    @Input() public playerId: string;
    @Input() public currentRole: string;
    @Output() changeRoleRequest: EventEmitter<ChangeRoleRequest> = new EventEmitter<ChangeRoleRequest>();
    public readonly allRoles = ['moderator', 'player', 'observer'];

    public isCurrentRole (role: string): boolean {
        return role === this.currentRole;
    }

    public changeToRole (role: string): void {
        this.changeRoleRequest.emit({
            playerId: this.playerId,
            role
        });
    }

}
