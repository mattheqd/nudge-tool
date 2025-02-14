const URL = "http://localhost:5050";

export async function fetchData(route, queryParams, body, type) {
    let fullUrl = `${URL}${route}`;

    if (type === "GET") {
        // Convert queryParams array into a query string
        const queryString = queryParams.map(param => `${encodeURIComponent(param[0])}=${encodeURIComponent(param[1])}`).join('&');
        if (queryString) {
            fullUrl += `?${queryString}`;
        }

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(fullUrl, {
                method: 'GET',
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    } else if (type === "POST") {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                body: JSON.stringify(body)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    } else if (type === "PUT") {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(fullUrl, {
                method: 'PUT',
                body: JSON.stringify(body)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error('Unsupported request type');
    }
}
