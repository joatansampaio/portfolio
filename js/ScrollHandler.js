const scrollToIntroBtns = document.querySelectorAll(".scroll-to-intro");
const scrollSpeed = 0.1;

function goToY(x) {

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

scrollToIntroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    })
});


