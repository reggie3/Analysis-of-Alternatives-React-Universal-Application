import React, {Component} from 'react';
import actions from '../redux/actions';
import { Modal, Button, Table, FormControl } from 'react-bootstrap';
import validator from 'validator';
const replaceAll = require("underscore.string/replaceAll")


class AlternativeDataEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            alternative: {},
            criteria: [],
            scores: [[]],
            dispatch: {}
        }
    }

    openModal(id, alternative, criteria, scores, dispatch) {
        //console.log("show modal id : " + id);
        this.setState({
            showModal: true,
            alternative: alternative,
            criteria: criteria,
            scores: scores,
            dispatch: dispatch
        });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    updateAlternativeScore(altID, critID, event) {
         let newScores = this.state.scores.map(function (arr) {
                return arr.slice();
            });
            newScores[altID][critID] = event.target.value;

            this.setState({
                scores: newScores
            });
        if (validator.isNumeric(event.target.value)) {
            event.target.className = replaceAll(event.target.className, " error", "");
            this.state.dispatch(actions.updateScore(altID, critID, event.target.value));
        }
        else{
            event.target.className = event.target.className + " error";
        }
    }

    render() {
        //console.log("rendering modal");
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter scores for {this.state.alternative.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Criteria</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.criteria.map((criterion) => {
                                    return <tr key={criterion.id}>
                                        <td>{criterion.name}</td>
                                        <td className='scoreInput'>
                                            <FormControl
                                                type="text"
                                                value={this.state.scores[this.state.alternative.id][criterion.id]}
                                                placeholder="Enter score"
                                                onChange={this.updateAlternativeScore.bind(this,
                                                    this.state.alternative.id,
                                                    criterion.id) }
                                                />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal.bind(this) }>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default AlternativeDataEntry;