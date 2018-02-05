const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

// Stateless functional component that receives
// data as props then simply presents it
function PullRequestsList ({ pullrequests }) {
    return (
        <ul>
        {pullrequests.map(({ title, html_url, closed_at, comments}, index) => (
            <li key={title}>
                <ul>
                    <li>{index + 1}. <a href={html_url}>{title}</a></li>
                    <li>Closed or merged on - {closed_at}</li>
                    <li>Comments: <a href={html_url}>{comments}</a></li>
                </ul>
                <br></br>
            </li>
            ))}
        </ul>
    )
}

PullRequestsList.propTypes = {
    pullrequests: PropTypes.array.isRequired
}

class PullRequests extends React.Component {
    constructor(props) {
        super(props)
        // Initial state of component
        this.state = {
            pullrequests: null
        };
    }

    componentDidMount() {
        // AJAX call to GitHub API
        api.fetchPullRequests()
            .then((pullrequests) => this.setState(() => ({ pullrequests })));
    }

    render() {
        const { pullrequests } = this.state
        return (
            <div>
                {!pullrequests
                    ? <p>Loading pull request information...</p>
                    : <PullRequestsList pullrequests={pullrequests} />
                }
            </div>
        )
    }
}

module.exports = PullRequests;