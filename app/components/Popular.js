var React = require('react');
var PropTypes = require('prop-types')

// Stateless functional component
// Each component is receiving its data as
// props then simply presenting that data.
function SelectLanguage (props) {
    var languages = ['All', 'JS', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map(function (language) {
                return (
                    <li
                        style={ language === props.selectedLanguage ? { color: '#d0021b' }: null }
                        onClick={props.onSelect.bind(null, language)}
                        key={language}>
                        {language}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = { // state of component
            selectedLanguage: 'All' // selectedLanguage prop to our state
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(language) { // updates state
        this.setState(function () {
            return { // returns new state
                selectedLanguage: language
            }
        });
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
}

module.exports = Popular;