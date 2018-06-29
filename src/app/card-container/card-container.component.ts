import { Component } from '@angular/core';

@Component({
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {

    public values: number[] = [1, 2, 3, 5, 8, 13, 21, 34];
    private selectedValue: number = null;

    public selectValue (value: number): void {
        this.selectedValue = value;
    }

    public isSelected (value: number): boolean {
        return this.selectedValue === value;
    }

}
