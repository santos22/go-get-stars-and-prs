const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Nav = require('./Nav');
const Home = require('./Home');
const Popular = require('./Popular')
const PullRequests = require('./PullRequests')

// Create React component definition named App
class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/popular' component={Popular}/>
                        <Route path='/closed' component={PullRequests}/>
                        <Route render={() => <p>Not Found</p>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

// Export App component so index.js can require it
module.exports = App;