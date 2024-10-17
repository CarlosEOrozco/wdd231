// Lazy loading images
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const lazyLoad = (target) => {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazy-loaded');
                    observer.disconnect();
                }
            });
        });
        obs.observe(target);
    };

    lazyImages.forEach(lazyLoad);
});

// Visitor Message using localStorage
const visitorInfoDiv = document.getElementById('visitor-info');
const lastVisit = localStorage.getItem('lastVisit');
const currentVisit = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

if (!lastVisit) {
    visitorInfoDiv.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
} else {
    const timeDifference = currentVisit - lastVisit;
    const daysSinceLastVisit = Math.floor(timeDifference / oneDay);

    if (timeDifference < oneDay) {
        visitorInfoDiv.innerHTML = "<p>Back so soon! Awesome!</p>";
    } else if (daysSinceLastVisit === 1) {
        visitorInfoDiv.innerHTML = `<p>You last visited 1 day ago.</p>`;
    } else {
        visitorInfoDiv.innerHTML = `<p>You last visited ${daysSinceLastVisit} days ago.</p>`;
    }
}

localStorage.setItem('lastVisit', currentVisit);
