/**
 * Megalearn Website - Main JavaScript
 * Handles section interactions and game preview hover effects
 */

(function() {
  'use strict';

  // Game image paths (supports png, jpg, gif)
  const gameImages = {
    'tao-kae-noi-world': 'assets/images/tao-kae-noi-world.png',
    'vasa-ship': 'assets/images/vasa-ship.png',
    'mega-museum-world': 'assets/images/mega-museum-world.png',
    'bloom': 'assets/images/bloom.png',
    'finding-stubby': 'assets/images/finding-stubby.png'
  };

  // Theme colors for each section
  const sectionThemes = {
    '00': 'blue',
    '01': 'pink',
    '02': 'orange',
    '03': 'black'
  };

  // DOM Elements
  let sections;
  let gamePreview;
  let gamePreviewImg;
  let activeSection = null;

  // Section order for navigation
  const sectionOrder = ['00', '01', '02', '03'];

  /**
   * Initialize the application
   */
  function init() {
    sections = document.querySelectorAll('.section');
    gamePreview = document.getElementById('gamePreview');
    gamePreviewImg = document.getElementById('gamePreviewImg');

    setupSectionListeners();
    setupGameHoverListeners();
    setupLogoListener();
    setupKeyboardNavigation();
    setupHashNavigation();
    handleInitialHash();
  }

  /**
   * Handle initial URL hash on page load
   */
  function handleInitialHash() {
    const hash = window.location.hash.slice(1); // Remove the #
    if (hash && sectionOrder.includes(hash)) {
      toggleSection(hash, false); // Don't update hash since it's already set
    }
  }

  /**
   * Set up hash change listener for back/forward navigation
   */
  function setupHashNavigation() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash && sectionOrder.includes(hash)) {
        if (activeSection !== hash) {
          toggleSection(hash, false);
        }
      } else if (!hash && activeSection) {
        resetToDefault(false);
      }
    });
  }

  /**
   * Set up click listener for logo to reset to default state
   */
  function setupLogoListener() {
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        resetToDefault();
      });
    }
  }

  /**
   * Reset to default state (Front screen)
   */
  function resetToDefault(updateHash = true) {
    const body = document.body;
    
    // Deactivate any active section
    if (activeSection) {
      const prevSection = document.querySelector(`[data-section="${activeSection}"]`);
      if (prevSection) {
        prevSection.classList.remove('active');
      }
    }
    
    // Reset to default theme
    body.removeAttribute('data-active-section');
    body.dataset.theme = 'default';
    activeSection = null;
    
    // Update URL hash
    if (updateHash) {
      history.pushState(null, '', window.location.pathname);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Set up click listeners for section toggling
   */
  function setupSectionListeners() {
    sections.forEach(section => {
      const sectionId = section.dataset.section;
      const numberBtn = section.querySelector('.section-number');
      const headerBtn = section.querySelector('.header-btn');

      // Click on number
      numberBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSection(sectionId);
      });

      // Click on header
      headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSection(sectionId);
      });
    });
  }

  /**
   * Toggle a section's active state
   */
  function toggleSection(sectionId, updateHash = true) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    const body = document.body;

    if (activeSection === sectionId) {
      // Deactivate - return to default
      section.classList.remove('active');
      body.removeAttribute('data-active-section');
      body.dataset.theme = 'default';
      activeSection = null;
      
      // Update URL hash
      if (updateHash) {
        history.pushState(null, '', window.location.pathname);
      }
    } else {
      // Deactivate previous section if any
      if (activeSection) {
        const prevSection = document.querySelector(`[data-section="${activeSection}"]`);
        if (prevSection) {
          prevSection.classList.remove('active');
        }
      }

      // Activate new section
      section.classList.add('active');
      body.dataset.activeSection = sectionId;
      body.dataset.theme = sectionThemes[sectionId];
      activeSection = sectionId;
      
      // Update URL hash
      if (updateHash) {
        history.pushState(null, '', `#${sectionId}`);
      }

      // Scroll to show the section content
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Set up hover listeners for game rows
   */
  function setupGameHoverListeners() {
    const gameRows = document.querySelectorAll('.game-row');

    gameRows.forEach(row => {
      const gameId = row.dataset.game;
      const imagePath = gameImages[gameId];

      row.addEventListener('mouseenter', () => {
        if (imagePath) {
          showGamePreview(imagePath, row.querySelector('.game-name').textContent);
        }
      });

      row.addEventListener('mouseleave', () => {
        hideGamePreview();
      });
    });
  }

  /**
   * Show game preview image
   */
  function showGamePreview(imagePath, altText) {
    // Check if image exists by creating a test image
    const testImg = new Image();
    testImg.onload = () => {
      gamePreviewImg.src = imagePath;
      gamePreviewImg.alt = altText;
      gamePreview.classList.add('visible');
    };
    testImg.onerror = () => {
      // Image doesn't exist, don't show preview
      hideGamePreview();
    };
    testImg.src = imagePath;
  }

  /**
   * Hide game preview image
   */
  function hideGamePreview() {
    gamePreview.classList.remove('visible');
  }

  /**
   * Set up keyboard navigation with arrow keys
   */
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToNextSection();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToPreviousSection();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        resetToDefault();
      }
    });
  }

  /**
   * Navigate to the next section
   */
  function navigateToNextSection() {
    if (activeSection === null) {
      // No section active, go to first section
      toggleSection('00');
    } else {
      const currentIndex = sectionOrder.indexOf(activeSection);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < sectionOrder.length) {
        toggleSection(sectionOrder[nextIndex]);
      }
    }
  }

  /**
   * Navigate to the previous section
   */
  function navigateToPreviousSection() {
    if (activeSection === null) {
      // No section active, go to last section
      toggleSection('03');
    } else {
      const currentIndex = sectionOrder.indexOf(activeSection);
      const prevIndex = currentIndex - 1;
      
      if (prevIndex >= 0) {
        toggleSection(sectionOrder[prevIndex]);
      } else {
        // At first section, go back to default
        resetToDefault();
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

