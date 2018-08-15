import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerWithStatus, RoomService, Room } from '../room.service';

@Component({
    selector: 'app-room-player-cards',
    templateUrl: './room-player-cards.component.html',
    styleUrls: ['./room-player-cards.component.css']
})
export class RoomPlayerCardsComponent implements OnInit {
    @Input() private roomId: string;

    public players: Observable<PlayerWithStatus[]>;
    public room: Observable<Room>;

    constructor (private roomService: RoomService) { }

    ngOnInit () {
        this.players = this.roomService.getPlayersInRoomWithOnlineStatus(this.roomId);
        this.room = this.roomService.getRoom(this.roomId);
    }
}
