import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomService, Player, Room } from '../room.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    @Input() public roomId: string;
    @Input() public playerId: string;
    public isCurrentPlayerObserver: Observable<boolean>;
    public canVote: Observable<boolean>;
    public room: Observable<Room>;

    constructor (private roomService: RoomService) {}

    ngOnInit () {
        this.isCurrentPlayerObserver = this.roomService.getPlayer(this.roomId, this.playerId).pipe(
            map((player: Player) => player.role === 'observer')
        );
        this.canVote = this.roomService.getRoom(this.roomId).pipe(
            map((room: Room) => room.canVote)
        );
        this.room = this.roomService.getRoom(this.roomId);
    }

}
