import { Component, Input, OnInit } from '@angular/core';
import { RoomService, Room } from '../../room.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-room-cards',
    templateUrl: './room-cards.component.html',
    styleUrls: ['./room-cards.component.css']
})
export class RoomCardsComponent implements OnInit {
    @Input() private roomId: string;
    public room: Observable<Room>;
    public selectedCardValue: number = null;

    constructor (private roomService: RoomService) {}

    public ngOnInit () {
        this.room = this.roomService.getRoom(this.roomId);
    }

    public selectCardValue (value: number): void {
        this.selectedCardValue = value;
    }

}
