import React, {Component} from 'react';
import actions from '../redux/actions';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import WeightPicker from './WeightPicker';
import ScoreInverter from './ScoreInverter';

class AddCriteria extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            description: "",
            weight: "0",
            useInvertedScoring: false
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            // TODO: check to see if criteria of this name already exists
            case "name":
                this.setState({
                    name: event.target.value
                })
                break;
            case "description":
                this.setState({
                    description: event.target.value
                })
                break;
            case "weight":
                this.setState({
                    weight: event.target.value
                })
                break;
        }
    }

    handleSubmit(event) {
        console.log("submit clicked: " + event);
        event.preventDefault();
        this.props.dispatch(actions.addCriterion(
            this.state,
            this.props.alternatives,
            this.props.criteria
        ));

        // clear the form
        this.setState({
            name: "",
            description: ""
        })
        /* 
        The following two function calls are a test of sequential action calling using the 
        technique described by Reddit user cyex here:
        https://www.reddit.com/r/reduxjs/comments/4yg9jj/calling_state_altering_reducer_functions/d6oxh7h
        This test is accompanied by two commented out actions in actions.js
        
        // update Branch A
        var newCriterion = actions.addCriterion(this.state); // ID is assigned here, not in reducer
        this.props.dispatch(newCriterion);

        // update Branch B
        var scoreGrid = actions.completeScoreGrid(this.props.alternatives, this.props.criteria);
        this.props.dispatch(scoreGrid)
        */
    }

    // thisPointer is a pointer to this component
    setWeight(value, thisPointer) {
        console.log(value + " clicked");
        thisPointer.setState({
            weight: value
        });
    }

    setInvertedScoring(bolInvert, thisPointer) {
        thisPointer.setState({
            useInvertedScoring: bolInvert
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this) }>
                    <FormGroup>
                        <ControlLabel>Add New Criteria</ControlLabel>
                        <FormControl
                            type="text"
                            onChange={this.handleChange.bind(this) }
                            name="name"
                            placeholder ="Insert criteria name here"
                            value = {this.state.name}
                            />
                    </FormGroup>
                    <FormGroup>
                        <WeightPicker
                            weight={this.state.weight}
                            parent={this}
                            dispatcher={this.props.dispatch}
                            parentHandler={this.setWeight}
                            />
                        <ScoreInverter
                            parent={this}
                            dispatcher={this.props.dispatch}
                            parentHandler={this.setInvertedScoring}
                            />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            componentClass="textArea"
                            onChange={this.handleChange.bind(this) }
                            placeholder ="Describe this criteria"
                            name="description"
                            value = {this.state.description}
                            />
                    </FormGroup>
                    <Button type='submit'  text='submit' bsStyle='primary'>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AddCriteria;