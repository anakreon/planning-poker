import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    createFormGroup: FormGroup;
    joinFormGroup: FormGroup;

    constructor (private formBuilder: FormBuilder, private router: Router, private roomService: RoomService) {}

    ngOnInit () {
        this.createFormGroup = this.formBuilder.group({
            roomCtrl: ['', Validators.required]
        });
        this.joinFormGroup = this.formBuilder.group({
            roomCtrl: ['', Validators.required]
        });
    }

    public createRoomClicked () {
        if (!this.createFormGroup.invalid) {
            const roomName = this.createFormGroup.value.roomCtrl as string;
            this.createRoom(roomName);
        }
    }

    private createRoom (roomName: string): void {
        this.roomService.createRoom(roomName).then((roomId) => {
            this.joinRoom(roomId);
        });
    }

    public joinRoomClicked () {
        if (!this.joinFormGroup.invalid) {
            const roomId = this.joinFormGroup.value.roomCtrl as string;
            this.joinRoom(roomId);
        }
    }

    private joinRoom (roomId: string): void {
        this.router.navigate(['/room/' + roomId]);
    }
}
