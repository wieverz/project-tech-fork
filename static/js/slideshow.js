
let slides; 
const nextBtn = document.querySelector('.slideshow__nav--next');
const prevBtn = document.querySelector('.slideshow__nav--prev');
let currentIndex = 0;
let slideInterval;

function updateSlidesArray() {
    // Haal de lijst met slides opnieuw op
    slides = document.querySelectorAll('.slideshow__item');
    checkIfEmpty();
}

updateSlidesArray();

function showSlide(index) {
    if (slides.length === 0) return; // Stop als er geen slides zijn

    slides[currentIndex].classList.remove('slideshow__item--active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('slideshow__item--active');
}

// functie wordt aangeropen als de knoppen worden geklikt of als de timer voorbij is

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Event Listeners
if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

// Timer functies
function startTimer() {
    slideInterval = setInterval(nextSlide, 10000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();

// --- SLIDESHOW EDITING  ---

// Functie om een foto te verwijderen uit de slideshow 
function removePhotoFromSlideshow(buttonElement) {
    // zoek naar de foto die bij de knop klik hoort
    const slideToRemove = buttonElement.closest('.slideshow__item');
    const isActiveSlide = slideToRemove.classList.contains('slideshow__item--active');

    // Als we de actieve slide verwijderen, moeten we direct naar de volgende slide springen
    if (isActiveSlide) {
        if (slides.length > 1) {
            nextSlide(); // Ga naar de volgende slide voordat we de huidige verwijderen
        }
    }

    // Verwijder het element uit de DOM
    slideToRemove.remove();

    // Update de slides array zodat de navigatie weer klopt
    updateSlidesArray();

    // Reset de timer zodat hij niet direct verspringt na verwijdering
    resetTimer();
}

// Functie om te checken of de slideshow leeg is en het bericht te tonen
// laat of alleen het bericht zien of gewoon de normale styling
function checkIfEmpty() {
    const emptyMessage = document.getElementById('empty-message');
    if (slides.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        clearInterval(slideInterval); // Stop de timer
    } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (prevBtn) prevBtn.style.display = 'flex';
    }
}

// Functie om een nieuwe foto toe te voegen aan de slideshow
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const container = document.querySelector('.slideshow__container');
            
            const newSlide = document.createElement('div');
            newSlide.className = 'slideshow__item';
            
            // We voegen de afbeelding en de verwijderknop toe
            newSlide.innerHTML = `
            <img src="${e.target.result}" class="slideshow__image" alt="Nieuwe afbeelding">
            <button type="button" class="remove-photo edit-only" onclick="removePhotoFromSlideshow(this)">Foto verwijderen</button>
            `;
            
            container.appendChild(newSlide);

            // Als dit de enige foto is, maak hem dan meteen zichtbaar
            updateSlidesArray();
            if (slides.length === 1) {
                newSlide.classList.add('slideshow__item--active');
                startTimer(); // Herstart de timer
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}


