const clientId = '564bd5771a5e43a0b04a5a65f2c20ea7';  // Replace with your Spotify client ID
            const redirectUri = 'https://crushedcookienut.github.io/callback';  // Your GitHub Pages URL

            document.getElementById('login-button').addEventListener('click', () => {
                const scopes = 'user-read-currently-playing';
                const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
                window.location.href = authUrl;
            });

            function getCurrentlyPlaying() {
                const accessToken = localStorage.getItem('spotify_access_token');
                if (accessToken) {
                    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.item) {
                            const track = data.item.name;
                            const artist = data.item.artists.map(artist => artist.name).join(', ');
                            document.getElementById('currently-playing').textContent = `Currently Playing: ${track} by ${artist}`;
                        } else {
                            document.getElementById('currently-playing').textContent = 'Not currently playing any track.';
                        }
                    })
                    .catch(error => console.error('Error:', error));
                } else {
                    document.getElementById('currently-playing').textContent = 'Please log in to Spotify.';
                }
            }

            // Check for the authorization code in the URL hash
            const params = new URLSearchParams(window.location.hash.substring(1));
            const code = params.get('code');

            if (code) {
                fetch(`https://scjosb5w7xc3irm66ff5wya3am0pzvnz.lambda-url.eu-north-1.on.aws/?code=${code}&redirect_uri=${encodeURIComponent(redirect_uri)}`)
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('spotify_access_token', data.access_token);
                        getCurrentlyPlaying();
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                getCurrentlyPlaying();
            }

