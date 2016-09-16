import React, {Component} from 'react';
import {ResponsiveContainer, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class ChartCriteriaWeights extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSets: [],
            maxY: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.transformData(nextProps.criteria);
    }

    transformData(criteria) {
        this.setState({maxY: 0});
        let dataSets = criteria.map((criterion, index) => {
            return { name: criterion.name, weight: criterion.weight };
        });
        let maxY = Math.max.apply(Math, criteria.map((criterion) => {
            return criterion.weight;
        }));

        this.setState({
            dataSets: dataSets,
            maxY: maxY + 5
        });
    }

    render() {
        return (
            <div className="chart">
                <h3 className="chartTitle">{this.props.graphName}</h3>
                <ResponsiveContainer>
                    <BarChart
                        height={this.props.height}
                        width={this.props.width}
                        data={this.state.dataSets}
                        margin={{ top: 5, right: 30, left: 20, bottom: 15 }}
                        dataSets = {this.state.dataSets}>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, 10]}/>
                         <Bar  dataKey='weight' stroke='#8884d8' fill='#8884d8' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default ChartCriteriaWeights;