var React = require('react');
var ReactDOM = require('react-dom');
// include CSS in app when bundled
require('./index.css');

// create React component definition named App
class App extends React.Component {
    render() {
        return (
            <div>
                Hello React!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);