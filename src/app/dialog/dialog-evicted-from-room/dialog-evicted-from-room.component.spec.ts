import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvictedFromRoomComponent } from './dialog-evicted-from-room.component';

describe('DialogEvictedFromRoomComponent', () => {
    let component: DialogEvictedFromRoomComponent;
    let fixture: ComponentFixture<DialogEvictedFromRoomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogEvictedFromRoomComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogEvictedFromRoomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
