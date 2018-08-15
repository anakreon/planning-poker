import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomActionsComponent } from './room-actions.component';

describe('RoomActionsComponent', () => {
    let component: RoomActionsComponent;
    let fixture: ComponentFixture<RoomActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomActionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
