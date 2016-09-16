import React, {Component} from 'react';
import Criterion from './Criterion';
import CriterionDataEntry from "./CriterionDataEntry";

class CriteriaList extends Component {
    closeModal() {
        this.setState({ showModal: false });
    }
    
    openModal(id) {
        // get the criterion based on the passed id
        let criterion = this.props.criteria.filter((criterion)=>{
            return criterion.id === id;
        })[0];
        
        this.CriterionDataEntry.openModal(id,
            criterion,
            this.props.alternatives,
            this.props.scores,
            this.props.dispatch);
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
                                dispatch={this.props.dispatch}
                                scores={this.props.scores}
                                openModal = {this.openModal.bind(this) }
                                closeModal = {this.closeModal.bind(this) }
                                />
                        })
                    }
                </ul>
                <CriterionDataEntry ref={(ref) => this.CriterionDataEntry = ref}/>
            </div>
        );
    }
}

export default CriteriaList;