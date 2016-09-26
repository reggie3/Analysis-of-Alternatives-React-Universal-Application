import React, {Component} from 'react';
import Alternative from './Alternative';
import AlternativeDataEntry from "./AlternativeDataEntry";

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

class AlternativeListComponent extends Component {
    componentWillMount(){
        this.props.sortAlternatives();
    }
    closeModal() {
        this.setState({ showModal: false });
    }

    openModal(id) {
        // get the alternative based on the passed id
        let alternative = this.props.alternatives.filter((alternative)=>{
            return alternative.id === id;
        })[0];

        this.AlternativeDataEntry.openModal(id, 
            alternative, 
            this.props.criteria,
            this.props.scores);
    }
    
    render() {
        return (
            <div>
                <h4> List of Alternatives</h4>
                <ul>
                    {
                        this.props.alternatives.map((alternative) => {
                            return <Alternative 
                                key ={alternative.id} 
                                alternative={alternative} 
                                scores={this.props.scores}
                                openModal = {this.openModal.bind(this)}
                                closeModal = {this.closeModal.bind(this)}
                                />
                        })
                    }
                </ul>
                <AlternativeDataEntry 
                updateScore = {this.props.updateScore}
                ref={(ref) => this.AlternativeDataEntry = ref}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        update: state.alternatives,
        criteria: state.criteria,
        scores: state.scores
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updateScore: actions.updateScore,
        sortAlternatives: actions.sortAlternatives
    }, dispatch);
}

const AlternativeList = connect(mapStateToProps, mapDispatchToProps)(AlternativeListComponent);
export default AlternativeList;