async function callGraphQLAPI(query) {
    const url = 'https://trapapi-dev.azurewebsites.net/graphql/';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data;
}
