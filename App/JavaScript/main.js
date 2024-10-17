const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const BackgroundImg = document.getElementById('BackgroundImg');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
        BackgroundImg.style.filter = 'brightness(85%)';
    } else {
        toggleButton.textContent = 'Dark Mode';
        BackgroundImg.style.filter = 'none';
    }
});