var React = require('react');
var ReactDOM = require('react-dom');
// Include CSS in app when bundled
require('./index.css');
// Grab app component and render it
var App = require('./components/App');

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);