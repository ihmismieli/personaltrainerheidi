export function getCustomers() {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
        })
}

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
        })
}