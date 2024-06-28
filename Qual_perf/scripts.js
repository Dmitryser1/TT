document.getElementById('open-popup-button').addEventListener('click', function() {
    document.getElementById('popup-overlay').style.display = 'flex';
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup-overlay').style.display = 'none';
});