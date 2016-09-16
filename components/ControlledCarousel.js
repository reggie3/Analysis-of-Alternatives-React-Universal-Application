import React, {Component} from 'react';
import actions from '../redux/actions';
import { Carousel } from 'react-bootstrap';
import ChartCriteriaWeights from'./ChartCriteriaWeights';
import ChartWeightedScores from'./ChartWeightedScores';
import ChartRawScores from'./ChartRawScores';
import ChartNormalizedScores from'./ChartNormalizedScores';

class ControlledCarousel extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeGraphIndex: this.props.activeGraphIndex,
            direction: null,
            chartSize : {width: 700, height: 350}
        }
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            activeGraphIndex: selectedIndex,
            direction: e.direction
        });
        this.props.dispatch(actions.updateActiveGraphIndex(selectedIndex));
    }

    render() {
        return (
            <div className='carouselContainer'>
                <Carousel 
                    className = 'myCarousel'
                    activeIndex={this.props.activeGraphIndex}
                    direction={this.state.direction}
                    onSelect={this.handleSelect.bind(this) }
                    indicators={false}
                    >
                    <Carousel.Item className="carouselItem">
                        <ChartCriteriaWeights
                            criteria = {this.props.state.criteria}
                            graphName = {this.props.state.graphNames[0]}
                            chartSize = {this.state.chartSize}
                            />
                    </Carousel.Item >
                    <Carousel.Item className="carouselItem">
                        <ChartRawScores
                            scores = {this.props.state.scores}
                            criteria = {this.props.state.criteria}
                            alternatives = {this.props.state.alternatives}
                            graphName = {this.props.state.graphNames[1]}
                            chartSize = {this.state.chartSize}
                            />
                    </Carousel.Item>
                    <Carousel.Item className="carouselItem">
                        <ChartNormalizedScores
                            scores = {this.props.state.normalizedScores}
                            criteria = {this.props.state.criteria}
                            alternatives = {this.props.state.alternatives}
                            graphName = {this.props.state.graphNames[2]}
                            chartSize = {this.state.chartSize}
                            />
                    </Carousel.Item>
                    <Carousel.Item className="carouselItem">
                        <ChartWeightedScores
                            scores = {this.props.state.weightedScores}
                            criteria = {this.props.state.criteria}
                            alternatives = {this.props.state.alternatives}
                            graphName = {this.props.state.graphNames[3]}
                            chartSize = {this.state.chartSize}
                            />
                    </Carousel.Item>

                </Carousel>
            </div>

        )
    }
}

export default ControlledCarousel;