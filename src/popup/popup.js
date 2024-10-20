document.getElementById('authButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'authenticate' }, function(response) {
        console.log('Auth Response:', response);
    });
});