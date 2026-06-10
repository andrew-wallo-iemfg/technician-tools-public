/**
 * Section Navigation Handler
 * Switches between software and hardware sections
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
    event.target.closest('.nav-link').classList.add('active');
}

/**
 * Initialize navigation on page load
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
});
