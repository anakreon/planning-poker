import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTabJoinComponent } from './dashboard-tab-join.component';

describe('DashboardTabJoinComponent', () => {
    let component: DashboardTabJoinComponent;
    let fixture: ComponentFixture<DashboardTabJoinComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardTabJoinComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardTabJoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
