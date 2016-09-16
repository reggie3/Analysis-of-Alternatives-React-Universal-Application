import React, {Component} from 'react';
import {ButtonGroup, Button, FormGroup, ControlLabel} from 'react-bootstrap';
import actions from '../redux/actions';


const MyButton = ({ isActive, setWeight, idx }) => {
    const className = isActive ? 'button-primary' : 'button-default';
    return (
        <button className={className} onClick={setWeight}>{idx}</button>
    )
}

class WeightPicker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            weight: props.weight,
            weightButtons: []
        }
    }


    updateWeight(value) {
        this.setState({
            weight: value
        });
        // if props.id is defined then we can update the application's state directly
        if(this.props.id !== undefined){
            this.props.dispatch(actions.updateCriterionWeight(this.props.id, value));
        }
        // othewise set the state of the parent property since this criteria hasn't been
        // added to the application state yet, and thus doesn't have an ID
        else{
            this.props.parentHandler(value, this.props.parent);
        }
    }

    storeWeightButton(element) {
        this.state.weightButtons.push(element);
    }

    render() {
        let weight = this.state.weight;

        return (
            <div>
                <FormGroup>
                    <ControlLabel>{("Weight:  ").replace(/ /g, "\u00a0") }</ControlLabel>
                    <ButtonGroup >
                        <Button
                            ref = {this.storeWeightButton.bind(this) }
                            active = {(this.state.weight === 0) ? true : false}
                            onClick = { this.updateWeight.bind(this, 0) } >
                            0
                        </Button>
                        <Button ref={this.storeWeightButton.bind(this) }
                            active = {(this.state.weight === 1) ? true : false}
                            onClick={this.updateWeight.bind(this, 1) }>
                            1
                        </Button>
                        <Button ref={this.storeWeightButton.bind(this) }
                            active = {(this.state.weight === 2) ? true : false}
                            onClick={this.updateWeight.bind(this, 2) }>
                            2
                        </Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 3) ? true : false} onClick={this.updateWeight.bind(this, 3) }>3</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 4) ? true : false} onClick={this.updateWeight.bind(this, 4) }>4</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 5) ? true : false} onClick={this.updateWeight.bind(this, 5) }>5</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 6) ? true : false} onClick={this.updateWeight.bind(this, 6) }>6</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 7) ? true : false} onClick={this.updateWeight.bind(this, 7) }>7</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 8) ? true : false} onClick={this.updateWeight.bind(this, 8) }>8</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 9) ? true : false} onClick={this.updateWeight.bind(this, 9) }>9</Button>
                        <Button ref={this.storeWeightButton.bind(this) } active = {(this.state.weight === 10) ? true : false} onClick={this.updateWeight.bind(this, 10) }>10</Button>

                    </ButtonGroup>

                </FormGroup>
            </div >
        );
    }
}

export default WeightPicker;