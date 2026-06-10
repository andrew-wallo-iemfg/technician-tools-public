/**
 * Section Navigation Handler
 * Switches between software, hardware, and joke sections
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Update nav link active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (event && event.target) {
        event.target.closest('.nav-link').classList.add('active');
    }
}

/**
 * Joke Generator - Fetches jokes from the JokeAPI
 * API: https://jokeapi.dev/
 */

let currentJoke = null;
let selectedCategory = '';

/**
 * Fetch a joke from the JokeAPI
 */
async function getJoke() {
    const jokeDisplay = document.getElementById('jokeDisplay');
    const getJokeBtn = document.getElementById('getJokeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const jokeInfo = document.getElementById('jokeInfo');

    // Show loading state
    jokeDisplay.innerHTML = '<p class="loading">Loading joke...</p>';
    getJokeBtn.disabled = true;
    jokeInfo.innerHTML = '';

    try {
        // Build the API URL
        let apiUrl = 'https://v2.jokeapi.dev/joke/';
        
        if (selectedCategory) {
            apiUrl += selectedCategory;
        } else {
            apiUrl += 'Any';
        }

        // Add query parameters to exclude certain types if needed
        apiUrl += '?type=single,twopart';

        // Fetch the joke
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Check if no joke was found
        if (data.error) {
            jokeDisplay.innerHTML = '<p class="error">No jokes found for this category. Try another!</p>';
            copyBtn.style.display = 'none';
            return;
        }

        // Store the joke
        currentJoke = data;

        // Display the joke
        displayJoke(data);

        // Show copy button
        copyBtn.style.display = 'inline-block';

        // Show joke info
        jokeInfo.innerHTML = `
            <p class="joke-info-text">📁 Category: <strong>${data.category}</strong> | Type: <strong>${data.type}</strong></p>
        `;

    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeDisplay.innerHTML = `<p class="error">Oops! Something went wrong: ${error.message}</p>`;
        copyBtn.style.display = 'none';
    } finally {
        getJokeBtn.disabled = false;
    }
}

/**
 * Display the joke based on its type
 */
function displayJoke(joke) {
    const jokeDisplay = document.getElementById('jokeDisplay');

    if (joke.type === 'single') {
        // Single-line joke
        jokeDisplay.innerHTML = `<p class="joke-text">${joke.joke}</p>`;
    } else if (joke.type === 'twopart') {
        // Two-part joke (setup and delivery)
        jokeDisplay.innerHTML = `
            <p class="joke-setup">${joke.setup}</p>
            <p class="joke-delivery">${joke.delivery}</p>
        `;
    }
}

/**
 * Copy the joke to clipboard
 */
function copyJoke() {
    if (!currentJoke) return;

    let jokeText = '';

    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }

    // Copy to clipboard
    navigator.clipboard.writeText(jokeText).then(() => {
        // Show feedback
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy joke to clipboard');
    });
}

/**
 * Update the selected category
 */
function updateCategory() {
    const categorySelect = document.getElementById('categorySelect');
    selectedCategory = categorySelect.value;
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set software section as active by default
    const softwareLink = document.querySelector('a[href="#software"]');
    if (softwareLink) {
        softwareLink.classList.add('active');
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const navLinks = document.querySelectorAll('.nav-link');
            let currentIndex = Array.from(navLinks).findIndex(link => 
                link.classList.contains('active')
            );

            if (e.key === 'ArrowDown') {
                currentIndex = (currentIndex + 1) % navLinks.length;
            } else {
                currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
            }

            const nextLink = navLinks[currentIndex];
            nextLink.click();
        }
    });

    // Allow Enter key to get new joke when in joke section
    document.addEventListener('keydown', function(e) {
        const jokeSection = document.getElementById('joke');
        if (e.key === 'Enter' && jokeSection.classList.contains('active')) {
            getJoke();
        }
    });
});
