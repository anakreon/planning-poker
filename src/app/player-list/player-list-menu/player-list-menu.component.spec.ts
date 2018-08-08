import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListMenuComponent } from './player-list-menu.component';

describe('PlayerListMenuComponent', () => {
    let component: PlayerListMenuComponent;
    let fixture: ComponentFixture<PlayerListMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlayerListMenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerListMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
