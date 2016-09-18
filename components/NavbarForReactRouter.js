import React from 'react';
import { Link, IndexLink  } from 'react-router'

// import NavbarLink from '../components/NavbarLink'


let IndexNavbarLink = React.createClass({
  render() {
    return <IndexLink {...this.props} activeStyle={{ color: '#337Ab7' }}/>
  }
})
let NavbarLink = React.createClass({
  render() {
    return <Link {...this.props} activeStyle={{ color: '#337Ab7' }}/>
  }
})

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
                        return <IndexNavbarLink
                            style = {Object.assign({}, normalLink, homeLink) }
                            key = {index}
                            to = {link.url}>
                            {link.name}
                        </IndexNavbarLink>
                    else
                        return <NavbarLink
                            style = {normalLink}
                            key = {index}
                            to = {link.url}>
                            {link.name}
                        </NavbarLink>

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

var normalLink = {
    textDecoration: 'none',
    fontSize: '1.5em'
};

var homeLink = {
    fontSize: '1.85em'
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