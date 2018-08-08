import { VoteCardsModule } from './vote-cards.module';

describe('VoteCardsModule', () => {
    let voteCardsModule: VoteCardsModule;

    beforeEach(() => {
        voteCardsModule = new VoteCardsModule();
    });

    it('should create an instance', () => {
        expect(voteCardsModule).toBeTruthy();
    });
});
