const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

// Stateless functional components that receive
// data as props then simply present it
function SelectLanguage ({ selectedLanguage, onSelect }) {
    const languages = ['All', 'JS', 'Go', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map((language) => (
                <li
                    style={ language === selectedLanguage ? { color: '#d0021b' }: null }
                    onClick={() => onSelect(language)}
                    key={language}>
                    {language}
                </li>
            ))}
        </ul>
    )
}

function RepoGrid ({ repos }) {
    return (
        <ul className='popular-list'>
        {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
            <li key={name} className='popular-item'>
                <div className='popular-rank'>#{index + 1}</div>
                <ul className='space-list-items'>
                    <li>
                        <img
                            className='avatar'
                            src={owner.avatar_url}
                            alt={'Avatar for ' + owner.login}
                        />
                    </li>
                    <li><a href={html_url}>{name}</a></li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count} stars</li>
                </ul>
            </li>
            ))}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props)
        // Initial state of component
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    // Update language state
    updateLanguage(language) {
        this.setState(() => ({
            // Return new state
            selectedLanguage: language,
            repos: null
        }));

        // AJAX call to GitHub API
        api.fetchPopularRepos(language)
            .then((repos) => this.setState(() => ({ repos })));
    }

    render() {
        const { selectedLanguage, repos } = this.state
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!repos
                    ? <p>Loading popular repos...</p>
                    : <RepoGrid repos={repos} />
                }
            </div>
        )
    }
}

module.exports = Popular;