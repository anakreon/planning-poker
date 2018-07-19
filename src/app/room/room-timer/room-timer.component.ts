import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { RoomService, Room } from '../room.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface FirebaseDate {
    seconds: number;
    nanoseconds: number;
}

@Component({
    selector: 'app-room-timer',
    templateUrl: './room-timer.component.html',
    styleUrls: ['./room-timer.component.css']
})
export class RoomTimerComponent implements OnInit, OnDestroy {
    @Input() private roomId: string;
    @ViewChild(TimerComponent) timer: TimerComponent;
    private timerSubscription: Subscription;

    constructor (private roomService: RoomService) {}

    ngOnInit () {
        this.timerSubscription = this.roomService.getRoom(this.roomId).pipe(
            map((room: Room) => room.timerStart)
        ).subscribe((timerStart: FirebaseDate) => {
            if (timerStart) {
                const miliseconds = timerStart.seconds * 1000 + timerStart.nanoseconds / 1000000;
                const date = new Date(miliseconds);
                this.timer.start(date);
            } else {
                this.timer.reset();
            }
        });
    }

    ngOnDestroy () {
        this.timerSubscription.unsubscribe();
    }

}
