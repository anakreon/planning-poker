import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constant } from '../../shared/constant.service';

export interface RoomCreationRequest {
    roomName: string;
    roomOptions: {
        cards: string[]
    };
}

@Component({
    selector: 'app-dashboard-tab-create',
    templateUrl: './dashboard-tab-create.component.html',
    styleUrls: ['./dashboard-tab-create.component.css']
})
export class DashboardTabCreateComponent implements OnInit {
    @Output() private actionRequest: EventEmitter<RoomCreationRequest> = new EventEmitter<RoomCreationRequest>();
    public formGroup: FormGroup;
    public cardOptions: string[];

    constructor (private formBuilder: FormBuilder, constant: Constant) {
        this.cardOptions = constant.cards.preSelected;
    }

    ngOnInit () {
        this.formGroup = this.formBuilder.group({
            roomName: ['', Validators.required]
        });
    }

    public updateCardOptions (cardOptions: string[]) {
        this.cardOptions = cardOptions;
    }

    public buttonClicked () {
        if (!this.formGroup.invalid) {
            const roomCreationRequest = {
                roomName: this.formGroup.value.roomName as string,
                roomOptions: {
                    cards: this.cardOptions
                }
            }
            this.actionRequest.emit(roomCreationRequest);
        }
    }

}
