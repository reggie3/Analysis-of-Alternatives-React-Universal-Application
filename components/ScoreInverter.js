import React, {Component} from 'react';
import {ButtonGroup, Button, FormGroup, ControlLabel} from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';
import actions from '../redux/actions';

class ScoreInverter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            useInvertedScore: false
        }
    }

    updateInvertedScoring(elm, value) {
        this.setState({
            useInvertedScore: value
        });
        // if props.id is defined then we can update the application's state directly
        if (this.props.id !== undefined) {
            this.props.dispatch(actions.updateInvertedScoring(this.props.id, value));
        }
        // othewise set the state of the parent property since this criteria hasn't been
        // added to the application state yet, and thus doesn't have an ID
        else {
            this.props.parentHandler(value, this.props.parent);
        }
    }


    render() {
        return (
            <div>
                <FormGroup>
                    <ControlLabel>{("Invert Scoring ").replace(/ /g, "\u00a0") }</ControlLabel>
                    <Switch
                        onChange = {this.updateInvertedScoring.bind(this) }
                        value = {this.props.useInvertedScoring}
                        />
                </FormGroup>
            </div>
        );
    }
}

export default ScoreInverter;