import { TestBed, inject } from '@angular/core/testing';

import { RoomResolver } from './room-resolver.service';

describe('RoomResolverService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RoomResolver]
        });
    });

    it('should be created', inject([RoomResolver], (service: RoomResolver) => {
        expect(service).toBeTruthy();
    }));
});
