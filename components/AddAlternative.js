import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import actions from '../redux/actions';
import { Tooltip, Overlay, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
const replaceAll = require("underscore.string/replaceAll");
import ErrorPopup from './ErrorPopup';

class AddAlternative extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            description: "",
            criteriaScores: {},
            show: false
        }
    }

    showToolTip(type, refPopup, refTarget) {
        switch (type) {
            case "nameAlreadyExists":
                this.refs[refPopup].show(this.refs[refTarget]);
                break;
        }
    }

    hideToolTip(type, refName, refTarget) {
        switch (type) {
            case "nameAlreadyExists":
                this.refs[refName].hide(this.refs[refTarget]);
                break;
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            case "name":
                this.setState({
                    name: event.target.value.trim()
                });
                
                //search to see if this alternative name already exists
                let found = this.props.alternatives.filter((alternative) => {
                    return event.target.value === alternative.name;
                });

                if (found.length > 0) {
                    event.target.className = event.target.className + " error";
                    this.showToolTip("nameAlreadyExists", "error", "nameInput");
                }
                else {  // if this name does not exist
                    event.target.className = replaceAll(event.target.className, " error", "");
                    this.hideToolTip("nameAlreadyExists", "error", "nameInput");
                }
                break;
            case "description":
                this.setState({
                    description: event.target.value.trim()
                })
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.
            addAlternative(
            this.state,
            this.props.alternatives,
            this.props.criteria
            )
        );

        // clear the form
        this.setState({
            name: "",
            description: ""
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this) }>

                    <FormGroup>
                        <ControlLabel>Add New Alternative</ControlLabel>
                        <FormControl type="text" onChange={this.handleChange.bind(this) }
                            name="name"
                            placeholder ="Insert alternative name here"
                            value = {this.state.name}
                            ref = 'nameInput'
                            />
                            <ErrorPopup ref='error' message="alreadyUsed"/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl componentClass="textArea"
                            onChange={this.handleChange.bind(this) }
                            placeholder ="Describe this alternative"
                            name="description"
                            value = {this.state.description}
                            rows = '2'
                            />
                    </FormGroup>

                    <Button type='submit' text='submit' bsStyle='primary'>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AddAlternative;