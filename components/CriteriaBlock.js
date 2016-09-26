import React, {Component} from 'react';
import AddCriteria from './AddCriteria';
import CriteriaList from './CriteriaList';


class CriteriaBlock extends Component {

    render() {
        return (
            <div id="criteraBlock" className='entryAndDisplay'>
                <h3 className='blockHeader'>Criteria</h3>
                <AddCriteria
                    alternatives={this.props.alternatives}
                    criteria={this.props.criteria}
                    />
                <CriteriaList
                    alternatives={this.props.alternatives}
                    criteria = {this.props.criteria}
                    scores={this.props.scores}
                    />
            </div>
        );
    }
}

export default CriteriaBlock; 