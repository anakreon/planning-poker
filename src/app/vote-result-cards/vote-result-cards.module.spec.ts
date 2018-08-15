import { VoteResultCardsModule } from './vote-result-cards.module';

describe('VoteResultCardsModule', () => {
    let voteResultCardsModule: VoteResultCardsModule;

    beforeEach(() => {
        voteResultCardsModule = new VoteResultCardsModule();
    });

    it('should create an instance', () => {
        expect(voteResultCardsModule).toBeTruthy();
    });
});
