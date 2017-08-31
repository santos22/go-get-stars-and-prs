var React = require('react');
var Popular = require('./Popular')

// create React component definition named App
class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

// export App component so index.js can require it
module.exports = App;