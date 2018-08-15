import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlayerListComponent } from './room-player-list.component';

describe('RoomPlayerListComponent', () => {
    let component: RoomPlayerListComponent;
    let fixture: ComponentFixture<RoomPlayerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomPlayerListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomPlayerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
