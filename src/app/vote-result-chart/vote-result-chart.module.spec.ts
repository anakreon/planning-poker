import { VoteResultChartModule } from './vote-result-chart.module';

describe('VoteResultChartModule', () => {
    let voteResultChartModule: VoteResultChartModule;

    beforeEach(() => {
        voteResultChartModule = new VoteResultChartModule();
    });

    it('should create an instance', () => {
        expect(voteResultChartModule).toBeTruthy();
    });
});
