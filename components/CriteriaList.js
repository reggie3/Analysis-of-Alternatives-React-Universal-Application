import React, {Component} from 'react';
import Criterion from './Criterion';
import CriterionDataEntry from "./CriterionDataEntry";

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';


class CriteriaListComponent extends Component {
    componentWillMount(){
        this.props.sortCriteria();
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal(id) {
        // get the criterion based on the passed id
        let criterion = this.props.criteria.filter((criterion) => {
            return criterion.id === id;
        })[0];

        this.CriterionDataEntry.openModal(id,
            criterion,
            this.props.alternatives,
            this.props.scores);
    }

    render() {
        return (
            <div>
                <h4> List of Criteria</h4>
                <ul>
                    {
                        this.props.criteria.map((criterion) => {
                            return <Criterion
                                key ={criterion.id}
                                criterion={criterion}
                                scores={this.props.scores}
                                openModal = {this.openModal.bind(this) }
                                closeModal = {this.closeModal.bind(this) }
                                />
                        })
                    }
                </ul>
                <CriterionDataEntry
                    updateScore = {this.props.updateScore}
                    ref={(ref) => this.CriterionDataEntry = ref}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        update: state.alternatives,
        criteria: state.criteria,
        scores: state.scores
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateScore: actions.updateScore,
        sortCriteria: actions.sortCriteria
    }, dispatch);
}

const CriteriaList = connect(mapStateToProps, mapDispatchToProps)(CriteriaListComponent);
export default CriteriaList;