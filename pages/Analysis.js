import React, {Component} from 'react';
import AlternativeBlock from "../components/AlternativeBlock";
import CriteriaBlock from "../components/CriteriaBlock";
import AnalysisTable from "../components/AnalysisTable";
import CarouselControls from "../components/CarouselControls";
import ControlledCarousel from "../components/ControlledCarousel";

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.scss';


class AnalysisPage extends Component {

    componentWillMount() {
        console.log("init");
        this.props.completeScoreGrid(this.props.state.alternatives, this.props.state.criteria);
    }

    render() {
        return (
            <div>
                <div id='graphBlock '>

                    <ControlledCarousel
                        graphNames = {this.props.state.graphNames}
                        activeGraphIndex = {this.props.state.activeGraphIndex}
                        state = {this.props.state}
                        changeCarousel = {this.props.updateActiveGraphIndex}/>
                    <CarouselControls
                        graphNames = {this.props.state.graphNames}
                        activeGraphIndex = {this.props.state.activeGraphIndex}
                        changeCarousel = {this.props.updateActiveGraphIndex}/>
                </div>
                <div className='infoBlock'>
                    <AlternativeBlock
                        alternatives = {this.props.state.alternatives}
                        criteria={this.props.state.criteria}
                        scores={this.props.state.scores}
                        dispatch={this.props.state.dispatch}
                        />
                    <CriteriaBlock
                        alternatives = {this.props.state.alternatives}
                        criteria={this.props.state.criteria}
                        dispatch={this.props.state.dispatch}
                        scores={this.props.state.scores}
                        />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        state: state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

const Analysis = connect(mapStateToProps, mapDispatchToProps)(AnalysisPage);

export default Analysis;