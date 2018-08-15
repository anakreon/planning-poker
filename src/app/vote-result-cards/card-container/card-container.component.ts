import { Component, Input } from '@angular/core';
import { Player } from '../card/card.component';

@Component({
    selector: 'app-result-cards',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
    @Input() public players: Player[];
    public pieChartData: any;
}
