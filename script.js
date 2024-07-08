const clientId = '564bd5771a5e43a0b04a5a65f2c20ea7';
const clientSecret = 'CLIENT_SECRET';
const redirectUri = 'http://crushedcookienut.github.io/callback';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

async function getCurrentlyPlaying(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    const data = await response.json();
    return data;
}

async function displayCurrentlyPlaying() {
    let accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        const statusDiv = document.getElementById('spotify-status');
        statusDiv.innerHTML = `<p>Please log in to see your currently playing track.</p>`;
        return;
    }

    const currentlyPlaying = await getCurrentlyPlaying(accessToken);

    const statusDiv = document.getElementById('spotify-status');

    if (currentlyPlaying && currentlyPlaying.item) {
        const track = currentlyPlaying.item;
        statusDiv.innerHTML = `
            <p>Track: ${track.name}</p>
            <p>Artist: ${track.artists.map(artist => artist.name).join(', ')}</p>
            <img src="${track.album.images[0].url}" alt="Album Art" style="width: 200px;">
        `;
    } else {
        statusDiv.innerHTML = `<p>Not currently playing anything.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', displayCurrentlyPlaying);

async function handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
        });

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        window.history.pushState({}, document.title, "/");
    }
}

handleCallback();

