import React, {Component} from 'react';
import { Button, Glyphicon, Collapse  } from 'react-bootstrap';
import actions from '../redux/actions';
import ContentEditable from "react-contenteditable";

class Alternative extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};
    }
    expandItem(event) {
        this.setState({ open: !this.state.open });
    }
    deleteItem(event) {
        event.preventDefault();
        this.props.dispatch(actions.deleteAlternativeAndDeleteAlternativeCritieriaCombintiationToScoreGrid(this.props.alternative.id));
    }
    editDescription(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateAlternativeDescription(this.props.alternative.id, event.target.value));
    }

    editName(event) {
        event.preventDefault();
        this.props.dispatch(actions.updateAlternativeName(this.props.alternative.id, 
            event.target.value));
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

export default Alternative;