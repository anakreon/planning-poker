import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../room/room.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor (private router: Router, private roomService: RoomService) {}

    public createRoom (roomName: string): void {
        const cardOptions: string[] = ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
        this.roomService.createRoom(roomName, cardOptions).then((roomId) => {
            this.joinRoom(roomId);
        });
    }

    public joinRoom (roomId: string): void {
        this.router.navigate(['room', roomId]);
    }
}
