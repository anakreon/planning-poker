import { Component, OnInit, Input } from '@angular/core';
import { PlayerWithStatus } from '../room.service';

@Component({
    selector: 'app-player-card',
    templateUrl: './player-card.component.html',
    styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
    @Input() public player: PlayerWithStatus;

    constructor () { }

    ngOnInit () { }

}
