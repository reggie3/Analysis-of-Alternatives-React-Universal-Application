import React, {Component} from 'react';
import { Button, Glyphicon, Collapse } from 'react-bootstrap';
import WeightPicker from './WeightPicker';
import ScoreInverter from './ScoreInverter';
import ContentEditable from "react-contenteditable";

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

class CriterionComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};
    }
    deleteItem(event) {
        event.preventDefault();
        this.props.deleteCriterionAndDeleteAlternativeCritieriaCombintiationToScoreGrid(this.props.criterion.id);
    }

    expandItem(event) {
        console.log("nameClicked");
        this.setState({ open: !this.state.open });
    }


    editDescription(event) {
        event.preventDefault();
        this.props.updateCriterionDescription(this.props.criterion.id, event.target.value);
    }

    editName(event) {
        event.preventDefault();
        this.props.updateCriterionName(this.props.criterion.id, event.target.value);
    }

     // input the performance of the alternatives for this criterion
    inputCriterionData(event) {
        this.props.openModal(this.props.criterion.id);
    }

    render() {
        return (
            <li className ='criteriaListItem' key={this.props.criterion.id}>
                <div className='liLeft'>
                    <div className='name'>
                        <ContentEditable
                            className='name'
                            html={this.props.criterion.name}
                            onChange={this.editName.bind(this) }
                            onClick={this.expandItem.bind(this) }
                            disabled={false}
                            />
                    </div>
                    <Collapse in={this.state.open}>
                        <div>
                            <div>
                                <ContentEditable
                                    className='description'
                                    html={this.props.criterion.description}
                                    onChange={this.editDescription.bind(this) }
                                    disabled={false}
                                    />
                            </div>
                            <WeightPicker
                                weight={this.props.criterion.weight}
                                id={this.props.criterion.id}
                                updateCriterionWeight={this.props.updateCriterionWeight}
                                />
                            <ScoreInverter
                                id={this.props.criterion.id}
                                updateInvertedScoring={this.props.updateInvertedScoring}
                                value={this.props.criterion.useInvertedScoring}
                                />
                        </div>
                    </Collapse>
                </div>
                <div className='liRight'>
                    <div className='itemButton'>
                        <Button onClick={this.inputCriterionData.bind(this) }><Glyphicon glyph="stats" /></Button>
                        <Button onClick={this.deleteItem.bind(this) }><Glyphicon glyph="remove" /></Button>
                    </div>
                </div>
            </li>
        );
    }
}

function mapStateToProps(state){
    return{
        alternatives: state.alternatives,
        criteria: state.criteria,
        scores: state.scores
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCriterionAndDeleteAlternativeCritieriaCombintiationToScoreGrid: actions.deleteCriterionAndDeleteAlternativeCritieriaCombintiationToScoreGrid,
        updateCriterionDescription: actions.updateCriterionDescription,
        updateCriterionName: actions.updateCriterionName,
        updateCriterionWeight: actions.updateCriterionWeight,
        updateInvertedScoring: actions.updateInvertedScoring
    }, dispatch);
}

const Criterion = connect(mapStateToProps, mapDispatchToProps)(CriterionComponent);
export default Criterion;