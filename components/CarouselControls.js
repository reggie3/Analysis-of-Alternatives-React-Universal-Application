import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import actions from '../redux/actions';

class CarouselControls extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            activeGraphIndex: this.props.activeGraphIndex
        };
    }

    handleSelect(index, graphName){
        this.setState({
            activeGraphIndex: index
        });
        this.props.dispatch(actions.updateActiveGraphIndex(index));
    }

    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Graphs</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>{
                        this.props.graphNames.map((graphName, index) => {
                            return <NavItem key={index}
                                href="#"
                                onSelect ={this.handleSelect.bind(this, index, graphName)}>
                                {graphName}
                            </NavItem>
                        })
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default CarouselControls;