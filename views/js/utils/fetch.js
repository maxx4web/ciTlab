function get(url) {
    return fetch(url)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            return json;
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
}