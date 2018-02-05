const axios = require('axios');

module.exports = {
    // TODO Use http://localhost:8081/popular?language= endpoint
    fetchPopularRepos (language) {
        const popularReposEndpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

        return axios.get(popularReposEndpoint)
            .then((response) => response.data.items);
    },

    fetchPullRequests () {
        const pullRequestEndpoint = `http://localhost:8081/closed`

        return axios.get(pullRequestEndpoint).then(({ data }) => data);
    }
}