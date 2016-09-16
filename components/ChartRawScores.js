import React, {Component} from 'react';
import {ResponsiveContainer} from 'recharts';
import MyBarChart from "./MyBarChart";

class ChartRawScores extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSets: [],
            criteriaNames: [],
            alternativeNames: [],
            maxY: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.transformData(nextProps.criteria, nextProps.alternatives,
            nextProps.scores, nextProps.graphName);
    }

    transformData(criteria, alternatives, scores, title) {
        // create scores object
        // group the alternatives by criteron
        let dataSets = [];
        let maxY = 0;
        
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
                dataSet[alternative.name] > maxY ? 
                    maxY =  parseInt(dataSet[alternative.name]) + 2 : null;
            }, this);

            dataSets.push(dataSet);

        }, this);


        this.setState({
            dataSets: dataSets,
            criteriaNames: criteriaNames,
            alternativeNames: alternativeNames,
            maxY: maxY
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

export default ChartRawScores;