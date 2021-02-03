export async function fetchResponse(url: string) {
    try {
        console.log("Fetching url: " + url);
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

export async function postResponse(url: string, body: string) {
    return customMethodWithBody(url, body, REQUEST_TYPE.POST);
}

export async function putResponse(url: string, body: string) {
    return customMethodWithBody(url, body, REQUEST_TYPE.PUT);
}

export async function customMethodWithBody(url: string, body: string, method: REQUEST_TYPE) {
    console.log(method + " url: " + url);
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

export async function deleteResponse(url: string) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return handleResponseDelete(response);
    } catch (error) {
        handleError(error);
    }
}

export async function handleResponse(response: Response) {
    if (response.ok) return response.json();
    if (response.status === 400) {

        const error = await response.text();
        console.log("error", error);
        throw new Error(error);
    }
    throw new Error("Network response was not ok.");
}

export async function handleResponseDelete(response: Response) {
    if (response.ok) return true;
    if (response.status === 400) {

        const error = await response.text();
        throw new Error(error);
    }
    throw new Error("Network response was not ok.");
}

export function handleError(error: Error) {

    console.error("API call failed. " + error);
    throw error;
}


enum REQUEST_TYPE {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
