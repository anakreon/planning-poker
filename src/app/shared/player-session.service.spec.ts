import { TestBed, inject } from '@angular/core/testing';

import { PlayerSessionService } from './player-session.service';

describe('PlayerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlayerSessionService]
        });
    });

    it('should be created', inject([PlayerSessionService], (service: PlayerSessionService) => {
        expect(service).toBeTruthy();
    }));
});
