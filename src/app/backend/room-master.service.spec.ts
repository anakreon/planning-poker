import { TestBed, inject } from '@angular/core/testing';

import { RoomMasterService } from './room-master.service';

describe('RoomMasterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RoomMasterService]
        });
    });

    it('should be created', inject([RoomMasterService], (service: RoomMasterService) => {
        expect(service).toBeTruthy();
    }));
});
