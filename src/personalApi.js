export function getCustomers() {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
        })
}

export function getCustomersForTraining() {
    return fetch(import.meta.env.VITE_API_TRAININGS_WITH_CUSTOMER_URL)
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

export function saveTraining(newTraining) {
    return fetch(import.meta.env.VITE_API_TRAININGS_URL, {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
            date: newTraining.date,
            duration: newTraining.duration,
            activity: newTraining.activity,
            customer: newTraining.customer, 
        }),
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in saving: " + response.statusText);
        return response.json();
    })
}

export function saveCustomer(newCustomer) {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newCustomer)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in saving: " + response.statusText);

        return response.json();
    })
}

export function updateCustomer(url, customer) {
    return fetch(url, {
        method:"PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in saving: " + response.statusText);
        
        return response.json();
    })
}

export function deleteCustomer(url) {
    return fetch(url, { method : "DELETE"})
    .then(response => {
        if(!response.ok)
            throw new Error("Error in delete: " + response.statusText);
        return response.json();
    })
}

export function deleteTraining(url) {
    return fetch(url, { method : "DELETE"})
    .then(response => {
        if(!response.ok)
            throw new Error("Error in delete: " + response.statusText);
        return response.json();
    })
}