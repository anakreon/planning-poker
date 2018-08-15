import { Component, Input } from '@angular/core';

export interface Player {
    name: string;
    role: string;
    vote: string;
}

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input() public player: Player;
}
