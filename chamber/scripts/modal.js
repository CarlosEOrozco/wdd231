// Open and close modals
const modals = document.querySelectorAll('.modal');
const links = document.querySelectorAll('.info-link');
const closeButtons = document.querySelectorAll('.close');

links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        modals[index].style.display = 'block';
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        modals[index].style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
