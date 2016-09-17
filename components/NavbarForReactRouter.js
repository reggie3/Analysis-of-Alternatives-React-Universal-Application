import React from 'react';
import NavLink from '../components/NavLink'


/**
 * creates a navbar that use react router routes
 *  */
export default React.createClass({

    navLink(link) {
        return "link";
    },

    render() {
        return <div className = "navbarForReactRouter" style={barStyle}>
            {
                this.props.links.map((link, index) => {
                    if (link.isHome)
                        return <NavLink
                            style = {Object.assign({}, link, homeLink) }
                            key = {index}
                            to = {link.url}>
                            {link.name}
                        </NavLink>
                    else
                        return <NavLink
                            style = {Object.assign({}, link) }
                            key = {index}
                            to = {link.url}>
                            {link.name}
                        </NavLink>

                })
            }
        </div>
    }
})


/*  styling for the links is inside the master.scss stylesheet*/
var barStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    padding: '1vh 5vw 1vh 5vw',
    backgroundColor: '#101010',
    
};

var link = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '2em'
};

var homeLink = {
    fontSize: '2.5em'
};


/*

 <NavLink
                        key = {index}
                        to = {link.url}>
                        {link.name}
                    </NavLink>

<div>
            <Navbar >
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/">Analysis of Alternatives</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>{
                        links.map((link, index) => {
                            return <NavItem key={index}>
                                <NavLink
                                    key = {index}
                                    to={"/" + link.url}>
                                    {link.name}
                                </NavLink>
                            </NavItem>
                        })
                    }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            */