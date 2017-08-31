var React = require('react');

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
        var languages = ['All', 'JS', 'Ruby', 'Java', 'CSS', 'Python'];
        
        return (
            <ul className='languages'>
                {languages.map(function (language) {
                    return (
                        <li
                            style={ language === this.state.selectedLanguage ? { color: '#d0021b' }: null }
                            onClick={this.updateLanguage.bind(null, language)}
                            key={language}>
                            {language}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

module.exports = Popular;