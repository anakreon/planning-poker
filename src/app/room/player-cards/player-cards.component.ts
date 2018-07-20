import { Component, OnInit, Input } from '@angular/core';
import { PlayerWithStatus } from '../room.service';

@Component({
    selector: 'app-player-cards',
    templateUrl: './player-cards.component.html',
    styleUrls: ['./player-cards.component.css']
})
export class PlayerCardsComponent implements OnInit {
    @Input() public players: PlayerWithStatus[];

    constructor () {}

    ngOnInit () { }

}
