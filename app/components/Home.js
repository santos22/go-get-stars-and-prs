const React = require('react');
const Link = require('react-router-dom').Link;

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1>Get your pull request information!</h1>
                <Link className='button' to='/closed'>
                    Pull Requests
                </Link>
            </div>
        )
    }
}

module.exports = Home;