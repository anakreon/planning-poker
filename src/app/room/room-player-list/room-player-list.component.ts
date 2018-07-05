import { Component, OnInit, Input } from '@angular/core';
import { Player, RoomService } from '../../room.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-room-player-list',
    templateUrl: './room-player-list.component.html',
    styleUrls: ['./room-player-list.component.css']
})
export class RoomPlayerListComponent implements OnInit {
    @Input('roomId') roomId: string;

    public players: Observable<Player[]>;

    constructor (private roomService: RoomService) { }

    ngOnInit () {
        this.players = this.roomService.getPlayersInRoomWithOnlineStatus(this.roomId);
    }

}
