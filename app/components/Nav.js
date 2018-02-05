const React = require('react');
const NavLink = require('react-router-dom').NavLink;

function Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>
                    Popular
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/closed'>
                    Pull Requests
                </NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav;