import { Component, Input, OnChanges } from '@angular/core';

interface Player {
    name: string;
    vote: string;
}

@Component({
    selector: 'app-result-chart',
    templateUrl: './vote-result-chart.component.html',
    styleUrls: ['./vote-result-chart.component.css']
})
export class VoteResultChartComponent implements OnChanges {
    @Input() public players: Player[];
    @Input() public cardOptions: string[];

    public chartData: any;

    public ngOnChanges () {
        if (this.players && this.cardOptions) {
            const allVAxisTicks = this.cardOptions.map((option: string) => parseInt(option, 10));
            this.chartData = this.buildChartData(this.players, allVAxisTicks);
        }
    }

    private buildChartData (players: Player[], allVAxisTicks: number[]): any {
        const chartTable = this.buildChartTable(players);
        if (!chartTable.length) {
            return;
        }
        return {
            chartType: 'ColumnChart',
            dataTable: [
                ['Name', 'Vote'],
                ...chartTable
            ],
            options: {
                'title': 'Votes',
                'width': 600,
                'height': 400,
                'vAxis': {
                    minValue: 0,
                    ticks: this.buildVAxisTicks(chartTable, allVAxisTicks)
                },
                colors: ['#ffab91']
            }
        };
    }
    private buildChartTable (players: Player[]): any[] {
        return this.getPlayersWithVoteSorted(players).map((player: Player) => {
            return [player.name, parseInt(player.vote, 10)];
        });
    }
    private getPlayersWithVoteSorted (players: Player[]) {
        return players.slice()
            .filter((player: Player) => !!player.vote)
            .sort((a, b) => this.sortByVote(a, b));
    }
    private sortByVote (a: Player, b: Player) {
        if (a.vote < b.vote) {
            return -1;
        } else if (a.vote === b.vote) {
            return 0;
        } else {
            return 1;
        }
    }
    private buildVAxisTicks (chartData: any, allVAxisTicks: number[]): number[] {
        if (chartData.length > 0) {
            const highestVAxisTick = chartData[chartData.length - 1][1];
            const highestVAxisTickIndex = allVAxisTicks.indexOf(highestVAxisTick);
            return allVAxisTicks.slice(0, highestVAxisTickIndex + 1);
        } else {
            return allVAxisTicks;
        }
    }
}
