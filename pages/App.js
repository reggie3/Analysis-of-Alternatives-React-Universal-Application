import React from 'react';
import NavLink from '../components/NavLink';
import Navbar from '../components/NavbarForReactRouter';


let links = [
    {
        name: "Analysis of Alternatives",
        url: "/",
        isHome: true
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Analysis",
        url: "/analysis"
    },
    {
        name: "Profile",
        url: "/profile"
    }
];

export default React.createClass({


    render() {
        return <div>
            <Navbar
                links = {links}
            />
            <div style={content}>
                {this.props.children}
            </div>
        </div>
    }
})

var content = {
    // provide some left and right side padding
    padding: '1vh 5% 0% 5%'
}