import React, { Component } from 'react';
import Chart from 'chart.js';
import RandomColor from 'rcolor';

class ChartComponent extends Component {

    buildDataset() {
        let label = [];
        let data = [];
        let color = [];

        this.props.trxGroup.forEach((group) => {
            if (group.type === 'EXPENSE') {
                label.push(group.desc);
                data.push(group.trxSum);
                color.push(RandomColor());
            }
        });

        return {
            label, data, color
        };
    }

    componentDidMount() {
        let dataset = this.buildDataset();
        var ctx = document.getElementById("myChart");
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: dataset.label,
                datasets: [{
                    data: dataset.data,
                    backgroundColor: dataset.color
                }]
            },
            options: {
                cutoutPercentage: 40
            }
        });
    }

    render() {
        return (
            <canvas id="myChart" width="400" height="400"></canvas>
        )
    }
}

export default ChartComponent;