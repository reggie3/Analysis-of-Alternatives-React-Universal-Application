import React, {Component} from 'react';
import Alternative from './Alternative';
import AlternativeDataEntry from "./AlternativeDataEntry";

class AlternativeList extends Component {
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
            this.props.scores,
            this.props.dispatch);
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
                                dispatch={this.props.dispatch}
                                scores={this.props.scores}
                                openModal = {this.openModal.bind(this)}
                                closeModal = {this.closeModal.bind(this)}
                                />
                        })
                    }
                </ul>
                <AlternativeDataEntry ref={(ref) => this.AlternativeDataEntry = ref}/>
            </div>
        );
    }
}

export default AlternativeList;