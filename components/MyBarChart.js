import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import colorUtilities from "../utilities/colorUtilities";

class MyBarChart extends Component {
    constructor(props, context) {
        super(props, context);

    }

    shouldComponentUpdate(nextProps, nextState){
        if((nextProps.height === 0)||(nextProps.weight === 0)){
            return false;
        }
        else {
            return true;
        } 
    }

    render() {

        return (
            <BarChart className="myBarChart"
                height={this.props.height}
                width={this.props.width - 20}
                data={this.props.dataSets}
                margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                <XAxis dataKey="name"/>
                <YAxis domain={[0, this.props.maxY]}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                {
                    this.props.alternativeNames.map((alternativeName, index) => {
                        // console.log(index + " " + alternativeName);
                        let color = colorUtilities.chartColors[index]["Hex"];
                        return <Bar key="index" dataKey={alternativeName} fill={color} />
                    })
                }

            </BarChart>

        )
    }
}

export default MyBarChart;