/**
 * Main JavaScript File for Game Entertainment Website
 * Handles navigation, game loading, and UI interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
        }
    });
    
    // Handle search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = this.querySelector('input').value.trim();
            if (searchInput) {
                // In a real application, this would search for games
                console.log('Searching for:', searchInput);
                // Redirect to search results page (commented out for demo)
                // window.location.href = `/search.html?q=${encodeURIComponent(searchInput)}`;
                alert(`Search feature will be implemented soon! You searched for: ${searchInput}`);
            }
        });
    }
    
    // Game iframe loading
    const gameFrame = document.querySelector('.game-frame');
    if (gameFrame) {
        // Add loading indicator
        const gameContainer = gameFrame.parentElement;
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<span>Loading game...</span>';
        gameContainer.appendChild(loadingIndicator);
        
        // Remove loading indicator when game is loaded
        gameFrame.addEventListener('load', function() {
            loadingIndicator.style.display = 'none';
        });
    }
    
    // Add play button hover effect for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const playButton = card.querySelector('.play-now');
        if (playButton) {
            card.addEventListener('mouseenter', () => {
                playButton.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                playButton.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Simple carousel for featured games if it exists
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentIndex = 0;
        const itemsCount = carouselItems.length;
        
        // Initialize carousel
        updateCarousel();
        
        // Carousel controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + itemsCount) % itemsCount;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % itemsCount;
                updateCarousel();
            });
        }
        
        // Auto-advance carousel
        let carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemsCount;
            updateCarousel();
        }, 5000);
        
        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % itemsCount;
                updateCarousel();
            }, 5000);
        });
        
        // Update carousel position
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
            
            // Update active indicators if they exist
            const indicators = carousel.querySelectorAll('.carousel-indicator');
            if (indicators.length) {
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }
    }
});

// Function to handle loading games in an iframe or new page
function loadGame(gamePath, gameTitle) {
    // Create the game frame container if it doesn't exist
    let gameFrameContainer = document.getElementById('game-frame-container');
    
    if (!gameFrameContainer) {
        // Create container element
        gameFrameContainer = document.createElement('div');
        gameFrameContainer.id = 'game-frame-container';
        gameFrameContainer.className = 'game-frame-modal';
        
        // Create header with title and close button
        const gameHeader = document.createElement('div');
        gameHeader.className = 'game-modal-header';
        
        const gameTitleElement = document.createElement('h2');
        gameTitleElement.textContent = gameTitle;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-game-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeGame;
        
        gameHeader.appendChild(gameTitleElement);
        gameHeader.appendChild(closeBtn);
        
        // Create frame container
        const frameWrapper = document.createElement('div');
        frameWrapper.className = 'frame-wrapper';
        
        // Create the iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'game-frame';
        iframe.src = gamePath;
        iframe.title = gameTitle;
        iframe.allowFullscreen = true;
        
        // Assemble the elements
        frameWrapper.appendChild(iframe);
        gameFrameContainer.appendChild(gameHeader);
        gameFrameContainer.appendChild(frameWrapper);
        
        // Add to the body
        document.body.appendChild(gameFrameContainer);
        
        // Prevent scrolling of the main page
        document.body.style.overflow = 'hidden';
    } else {
        // Update existing iframe
        const iframe = gameFrameContainer.querySelector('iframe');
        const gameTitleElement = gameFrameContainer.querySelector('h2');
        
        iframe.src = gamePath;
        iframe.title = gameTitle;
        gameTitleElement.textContent = gameTitle;
        
        // Show the container if it's hidden
        gameFrameContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Function to close the game
function closeGame() {
    const gameFrameContainer = document.getElementById('game-frame-container');
    if (gameFrameContainer) {
        gameFrameContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add styles for the game modal
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .game-frame-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .game-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #0f1923;
            color: white;
        }
        
        .close-game-btn {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            padding: 0 10px;
        }
        
        .close-game-btn:hover {
            color: #ff4655;
        }
        
        .frame-wrapper {
            flex: 1;
            overflow: hidden;
        }
        
        .game-frame {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #111;
        }
    `;
    document.head.appendChild(style);
});

// Function to handle category navigation
function navigateToCategory(category) {
    // Navigate to category page
    window.location.href = `/categories/${category}.html`;
}

// Function to apply filter on games (for category pages)
function filterGames(filter) {
    const games = document.querySelectorAll('.game-card');
    
    games.forEach(game => {
        const gameData = game.dataset.tags || '';
        
        if (filter === 'all' || gameData.includes(filter)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
} 