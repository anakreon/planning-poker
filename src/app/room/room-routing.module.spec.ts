import { RoomRoutingModule } from './room-routing.module';

describe('RoomRoutingModule', () => {
    let roomRoutingModule: RoomRoutingModule;

    beforeEach(() => {
        roomRoutingModule = new RoomRoutingModule();
    });

    it('should create an instance', () => {
        expect(roomRoutingModule).toBeTruthy();
    });
});
