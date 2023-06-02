function fetchAny(url) {
    return fetch(url).then((response) => response.json())
}

