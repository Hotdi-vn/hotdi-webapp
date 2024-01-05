
const token = localStorage.getItem("token")

class HttpWrapper{
    get(url:string, params:object) {
        return fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(r => r.json())
    }

    post(url:string, params:object){
        return fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(params)
        }).then(r => r.json())
    }
} 
export const fetcher = new HttpWrapper();