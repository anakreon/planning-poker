import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
    @Input() selectedValue: string;
    @Input() options: string[];
    @Input() canChangeSelection: boolean;
    @Output() selectRequest: EventEmitter<string> = new EventEmitter<string>();

    public selectValue (value: string): void {
        if (this.canChangeSelection) {
            this.selectRequest.emit(value);
        }
    }

    public isSelected (value: string): boolean {
        return this.selectedValue === value;
    }

}
