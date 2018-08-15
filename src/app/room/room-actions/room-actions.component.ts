import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, RoomService, Room } from '../room.service';
import { Constant } from '../../shared/constant.service';

@Component({
    selector: 'app-room-actions',
    templateUrl: './room-actions.component.html',
    styleUrls: ['./room-actions.component.scss']
})
export class RoomActionsComponent implements OnInit {
    @Input() private roomId: string;
    @Input() public currentPlayerId: string;
    public isCurrentPlayerModerator: Observable<boolean>;
    public canVote: Observable<boolean>;

    constructor (private roomService: RoomService, private constant: Constant) { }

    ngOnInit () {
        this.isCurrentPlayerModerator = this.roomService.getPlayer(this.roomId, this.currentPlayerId).pipe(
            map((player: Player) => player.role === this.constant.playerRole.moderator)
        );
        this.canVote = this.roomService.getRoom(this.roomId).pipe(
            map((room: Room) => room.canVote)
        );
    }

    public flipCards (): void {
        this.roomService.flipCards(this.roomId);
    }

    public newVote (): void {
        this.roomService.newVote(this.roomId);
    }

    public resetTimer (): void {
        this.roomService.resetTimer(this.roomId);
    }

}
