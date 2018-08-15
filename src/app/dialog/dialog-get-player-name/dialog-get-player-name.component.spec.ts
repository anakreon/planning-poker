import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGetPlayerNameComponent } from './dialog-get-player-name.component';

describe('DialogGetPlayerNameComponent', () => {
    let component: DialogGetPlayerNameComponent;
    let fixture: ComponentFixture<DialogGetPlayerNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogGetPlayerNameComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogGetPlayerNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
