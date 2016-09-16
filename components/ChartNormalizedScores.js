import React, {Component} from 'react';
import {ResponsiveContainer} from 'recharts';
import MyBarChart from "./MyBarChart";

class ChartNormalizedScores extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSets: [],
            criteriaNames: [],
            alternativeNames: [],
            maxY: 1
        }
    }


    componentWillReceiveProps(nextProps) {
         this.transformData(nextProps.criteria, nextProps.alternatives,
            nextProps.scores, nextProps.graphName);
    }

    transformData(criteria, alternatives, scores, title) {
        let dataSets = [];

        let criteriaNames = criteria.map((criterion) => {
            return criterion.name;
        });

        let alternativeNames = alternatives.map((alternative) => {
            return alternative.name;
        });

        criteria.forEach(function (criterion) {

            let dataSet = {};
            dataSet.name = criterion.name;

            alternatives.forEach(function (alternative) {
                dataSet[alternative.name] = scores[alternative.id][criterion.id];
            }, this);

            dataSets.push(dataSet);

        }, this);


       
        this.setState({
            dataSets: dataSets,
            criteriaNames: criteriaNames,
            alternativeNames: alternativeNames,
        });
    }

    render() {
        return (
            <div className="chart">
                <h3 className="chartTitle">{this.props.graphName}</h3>
                <ResponsiveContainer>
                    <MyBarChart
                        dataSets = {this.state.dataSets}
                        alternativeNames = {this.state.alternativeNames}
                        maxY = {this.state.maxY}
                        />
                </ResponsiveContainer>
            </div>
        )
    }
}

export default ChartNormalizedScores;