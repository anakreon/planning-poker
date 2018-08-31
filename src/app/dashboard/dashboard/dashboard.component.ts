import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../room/room.service';
import { RoomCreationRequest } from '../dashboard-tab-create/dashboard-tab-create.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor (private router: Router, private roomService: RoomService) {}

    public createRoom (roomCreationRequest: RoomCreationRequest): void {
        this.roomService.createRoom(roomCreationRequest.roomName, roomCreationRequest.roomOptions.cards).then((roomId) => {
            this.joinRoom(roomId);
        });
    }

    public joinRoom (roomId: string): void {
        this.router.navigate(['room', roomId]);
    }
}
