import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlayerCardsComponent } from './room-player-cards.component';

describe('RoomPlayerCardsComponent', () => {
    let component: RoomPlayerCardsComponent;
    let fixture: ComponentFixture<RoomPlayerCardsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomPlayerCardsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomPlayerCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
