import React, {Component} from 'react';
import actions from '../redux/actions';
import { Modal, Button, Table, FormControl, Overlay, Tooltip } from 'react-bootstrap';
import validator from 'validator';
const replaceAll = require("underscore.string/replaceAll");

class CriterionDataEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            criterion: {},
            alternatives: [],
            scores: [[]],
            dispatch: {},
            show: true,  // show the error popup
            target: () => ReactDOM.findDOMNode(this.refs.target)
        }
    }

    openModal(id, criterion, alternatives, scores, dispatch) {
        //console.log("show modal id : " + id);
        this.setState({
            showModal: true,
            criterion: criterion,
            alternatives: alternatives,
            scores: scores,
            dispatch: dispatch
        });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    updateCriterionScore(altID, critID, event) {
        let newScores = this.state.scores.map(function (arr) {
            return arr.slice();
        });
        newScores[altID][critID] = event.target.value;

        this.setState({
            scores: newScores
        });

        if (validator.isNumeric(event.target.value)) {
            this.setState({show: false});
            event.target.className = replaceAll(event.target.className, " error", "");
            this.state.dispatch(actions.updateScore(altID, critID, event.target.value));
        }
        else {
            event.target.className = event.target.className + " error";
            this.setState({show: true});
        }
    }

    render() {
        
        //console.log("rendering modal");
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter scores for {this.state.criterion.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<div id="errorMessageBlock" className="errorMessage"></div>*/}
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Alternatives</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.alternatives.map((alternative) => {
                                    return <tr key={alternative.id}>
                                        <td>{alternative.name}</td>
                                        <td className='scoreInput'>

                                            <FormControl
                                                type="text"
                                                value={this.state.scores[alternative.id][this.state.criterion.id]}
                                                placeholder="Enter score"
                                                onChange={this.updateCriterionScore.bind(this,
                                                    alternative.id,
                                                    this.state.criterion.id
                                                ) }
                                                />

                                            <Overlay placement="left">
                                                <Tooltip id="overload-left">Tooltip overload!</Tooltip>
                                            </Overlay>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button ref="target" onClick={this.closeModal.bind(this) }>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default CriterionDataEntry;