import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTabCreateComponent } from './dashboard-tab-create.component';

describe('DashboardTabCreateComponent', () => {
    let component: DashboardTabCreateComponent;
    let fixture: ComponentFixture<DashboardTabCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardTabCreateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardTabCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
