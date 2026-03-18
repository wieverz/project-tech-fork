const slides = document.querySelectorAll('.slideshow__item');
const nextBtn = document.querySelector('.slideshow__nav--next');
const prevBtn = document.querySelector('.slideshow__nav--prev');
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
    slides[currentIndex].classList.remove('slideshow__item--active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('slideshow__item--active');
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

function startTimer() {
    slideInterval = setInterval(nextSlide, 10000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();