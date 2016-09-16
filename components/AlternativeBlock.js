import React, {Component} from 'react';
import AddAlternative from './AddAlternative';
import AlternativeList from './AlternativeList';


class AlternativeBlock extends Component {

    render() {
        return (
            <div id="alternativesBlock" className='entryAndDisplay'>
                <h3 className='blockHeader'>Alternatives</h3>
                <AddAlternative 
                    alternatives={this.props.alternatives} 
                    criteria={this.props.criteria}
                    dispatch={this.props.dispatch}/>
                <AlternativeList 
                    alternatives={this.props.alternatives}
                    criteria = {this.props.criteria} 
                    dispatch={this.props.dispatch}
                    scores={this.props.scores}
                />
            </div> 
        );
    }
}

export default AlternativeBlock