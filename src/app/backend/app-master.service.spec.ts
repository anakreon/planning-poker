import { TestBed, inject } from '@angular/core/testing';

import { AppMasterService } from './app-master.service';

describe('AppMasterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppMasterService]
        });
    });

    it('should be created', inject([AppMasterService], (service: AppMasterService) => {
        expect(service).toBeTruthy();
    }));
});
