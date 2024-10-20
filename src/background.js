function authenticateSpotify() {
    const clientId = 'f8b71bcfcdd44402816476f864fb1926';
    const redirectUri = chrome.identity.getRedirectURL();
    const scopes = 'user-read-currently-playing playlist-modify-public';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;

    chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
    }, function(redirectUrl) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }
        const token = extractAccessTokenFromUrl(redirectUrl);
        console.log('Spotify Access Token:', token);
    });
}

function extractAccessTokenFromUrl(url) {
    const params = new URLSearchParams(url.split('#')[1]);
    return params.get('access_token');
}

authenticateSpotify();