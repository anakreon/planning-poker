import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    @Input() public showControls: boolean;
    public timerValue: string;
    private timerInterval: number;

    public ngOnInit () {
        this.reset();
    }

    public start (startDate = new Date()): void {
        this.reset();
        this.timerInterval = window.setInterval(() => {
            const diffInMs = (new Date()).getTime() - startDate.getTime();
            this.timerValue = new Date(diffInMs).toISOString().slice(11, -5);
        }, 1000);
    }

    public reset (): void {
        clearInterval(this.timerInterval);
        this.timerValue = '00:00:00';
    }

}
