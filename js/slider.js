// Array of mockup images
const mockupImages = [
    'img/mockup1.png',
    'img/mockup2.png',
    'img/mockup3.png'
];

let currentImageIndex = 0;
let slideInterval;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const mockupImage = document.querySelector('.phone-mockup');
    const indicators = document.querySelectorAll('.indicator');
    
    // Verificar se os elementos existem
    if (!mockupImage || indicators.length === 0) {
        console.log('Elementos do slider não encontrados');
        return;
    }
    
    // Iniciar slideshow automático
    startSlideshow();
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentImageIndex = index;
            updateImage();
            updateIndicators();
            restartSlideshow();
        });
    });

    // Function to start slideshow
    function startSlideshow() {
        slideInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % mockupImages.length;
            updateImage();
            updateIndicators();
        }, 4000); // Muda a cada 4 segundos
    }

    // Function to restart slideshow
    function restartSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Function to update the image with transition
    function updateImage() {
        // Add fade out effect
        mockupImage.style.opacity = '0';
        mockupImage.style.transform = 'scale(0.95)';

        // Change image after fade out
        setTimeout(() => {
            mockupImage.src = mockupImages[currentImageIndex];
            mockupImage.style.opacity = '1';
            mockupImage.style.transform = 'scale(1)';
        }, 250);
    }

    // Function to update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentImageIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Add transition styles to the mockup image
    mockupImage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    
    console.log('Slider inicializado com sucesso!');
});