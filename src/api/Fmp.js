//Fmp.js//
const fetch = require("node-fetch");

class Fmp {
    constructor(config, client) {
        this.client = client;
        this.token = config.api.fmpKey;
    }
    fmpQuery(url) {
        let Url = url + this.token;
        return new Promise((resolve, reject) => {
            const result = fetch(Url)
                .then(response => response.json()
                    .then(content => {
                        content ? resolve(content) : reject();
                    })
                )
        })
    }
    forceFetch(url) {
        return new Promise((resolve, reject) => {
            const result = fetch(url)
                .then(response => response.json()
                    .then(content => {
                        content ? resolve(content) : reject();
                    })
                )
        })
    }
}

module.exports = {
    Fmp
}
