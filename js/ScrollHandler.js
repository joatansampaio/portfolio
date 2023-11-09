const scrollSpeed = 0.1;

function scrollTo(x) {

    const animate = () => {
        scrollX += (x - scrollX) * scrollSpeed;
        content.style.transform = `translateX(-${scrollX}px)`;

        if (Math.abs(scrollX - x) > 1) {
            requestAnimationFrame(animate);
        } else {
            scrollX = x;
            content.style.transform = `translateX(-${scrollX}px)`;
        }
    };

    animate();
}

function scrollToX(x) {
    content.style.transform = `translateX(-${x}px)`;
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        scrollToX(0);
    }
})

function isElementInViewport(e) {
    const rect = e.getBoundingClientRect();
    return rect.bottom >= 50;
}

function isElementNotTotallyInViewPort(e) {
    const rect = e.getBoundingClientRect();
    return rect.bottom > 50;
}



