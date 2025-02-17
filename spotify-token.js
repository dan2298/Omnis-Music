import { Base64 } from 'js-base64';

const apiPrefix = 'https://accounts.spotify.com/api/token';
const clientId = 'e36bd479206743c2a045c39f4f95c978';
const clientSecret = 'e7f83e287bef48a89881cfb905d3d0cb';

const base64credentials = Base64.encode(`${clientId}:${clientSecret}`);

export default async () => {
    res = await fetch(apiPrefix, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
    const json = await res.json()
    const token = json.access_token;
    return token;
}
