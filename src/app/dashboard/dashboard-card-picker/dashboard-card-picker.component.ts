import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { Constant } from '../../shared/constant.service';

@Component({
    selector: 'app-dashboard-card-picker',
    templateUrl: './dashboard-card-picker.component.html',
    styleUrls: ['./dashboard-card-picker.component.css']
})
export class DashboardCardPickerComponent {
    @Input() public cardOptions: string[];
    @Output() private cardsSelectionUpdateRequest: EventEmitter<string[]> = new EventEmitter<string[]>();
    public allCardsSelection: string[];

    constructor (constant: Constant) {
        this.allCardsSelection = constant.cards.selection;
    }

    public onCardsToggle (change: MatButtonToggleChange) {
        const sortedCards = this.sortCards(change.value);
        this.cardsSelectionUpdateRequest.emit(sortedCards);
    }

    private sortCards (cards: string[]): string[] {
        const sortedCards = cards.slice();
        sortedCards.sort(this.sortByNumericValue);
        return sortedCards;
    }

    private sortByNumericValue (a: string, b: string): number {
        const intA = parseInt(a, 10);
        const intB = parseInt(b, 10);
        if (isNaN(intA)) {
            return 1;
        }
        if (isNaN(intB)) {
            return -1;
        }
        return intA - intB;
    }

}
