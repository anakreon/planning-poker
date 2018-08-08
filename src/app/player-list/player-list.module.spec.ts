import { PlayerListModule } from './player-list.module';

describe('PlayerListModule', () => {
    let playerListModule: PlayerListModule;

    beforeEach(() => {
        playerListModule = new PlayerListModule();
    });

    it('should create an instance', () => {
        expect(playerListModule).toBeTruthy();
    });
});
