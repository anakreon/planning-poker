import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-room-cards',
    templateUrl: './room-cards.component.html',
    styleUrls: ['./room-cards.component.css']
})
export class RoomCardsComponent {
    @Input() public options: number[];
    @Input() public canChangeSelection: boolean;

    public selectedCardValue: number = null;

    public selectCardValue (value: number): void {
        this.selectedCardValue = value;
    }

}
