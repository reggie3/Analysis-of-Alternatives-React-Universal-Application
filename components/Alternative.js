import React, {Component} from 'react';
import { Button, Glyphicon, Collapse  } from 'react-bootstrap';
import ContentEditable from "react-contenteditable";

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

class AlternativeComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};
    }
    expandItem(event) {
        this.setState({ open: !this.state.open });
    }
    deleteItem(event) {
        event.preventDefault();
        this.props.deleteAlternativeAndDeleteAlternativeCritieriaCombintiationToScoreGrid(this.props.alternative.id);
    }
    editDescription(event) {
        event.preventDefault();
        this.props.updateAlternativeDescription(this.props.alternative.id, event.target.value);
    }

    editName(event) {
        event.preventDefault();
        this.props.updateAlternativeName(this.props.alternative.id, 
            event.target.value);
    }
        // input alternatives performance criteria
    inputAlternativeData(event) {
        this.props.openModal(this.props.alternative.id);
    }

    render() {
        return (
            <li className='alternativeListItem'>
                <div className='liLeft'>
                    <div className='name'>
                        <ContentEditable
                            className='name'
                            html={this.props.alternative.name}
                            onClick={this.expandItem.bind(this) }
                            onChange={this.editName.bind(this) }
                            disabled={false}
                            />
                    </div>
                    <Collapse in={this.state.open}>
                        <div>
                            <ContentEditable
                                className='description'
                                html={this.props.alternative.description}
                                onChange={this.editDescription.bind(this) }
                                disabled={false}
                                />
                        </div>
                    </Collapse>
                </div>
                <div className='liRight'>
                    <div className='itemButton'>
                        <Button onClick={this.inputAlternativeData.bind(this) }><Glyphicon glyph="stats" /></Button>
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
        deleteAlternativeAndDeleteAlternativeCritieriaCombintiationToScoreGrid: actions.deleteAlternativeAndDeleteAlternativeCritieriaCombintiationToScoreGrid,
        updateAlternativeDescription: actions.updateAlternativeDescription,
        updateAlternativeName: actions.updateAlternativeName,

    }, dispatch);
}

const Alternative = connect(mapStateToProps, mapDispatchToProps)(AlternativeComponent);
export default Alternative;