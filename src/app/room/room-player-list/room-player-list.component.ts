import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, RoomService, Room } from '../room.service';
import { ChangeRoleRequest, EvictionRequest } from '../../player-list/player-list/player-list.component';
import { Constant } from '../../shared/constant.service';

@Component({
    selector: 'app-room-player-list',
    templateUrl: './room-player-list.component.html',
    styleUrls: ['./room-player-list.component.css']
})
export class RoomPlayerListComponent implements OnInit {
    @Input() private roomId: string;
    @Input() public currentPlayerId: string;

    public players: Observable<Player[]>;
    public room: Observable<Room>;
    public isCurrentPlayerModerator: Observable<boolean>;

    constructor (private roomService: RoomService, private constant: Constant) { }

    ngOnInit () {
        this.players = this.roomService.getPlayersInRoomWithOnlineStatus(this.roomId);
        this.room = this.roomService.getRoom(this.roomId);
        this.isCurrentPlayerModerator = this.roomService.getPlayer(this.roomId, this.currentPlayerId).pipe(
            map((player: Player) => player.role === this.constant.playerRole.moderator)
        );
    }

    public changeRole (request: ChangeRoleRequest): void {
        this.roomService.changePlayerRole(this.roomId, request.playerId, request.role);
    }

    public removePlayer (request: EvictionRequest): void {
        this.roomService.removePlayerFromRoom(this.roomId, request.playerId);
    }

}
