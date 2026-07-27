/* ============================================
   INTERACTIVE PERIODIC TABLE - MAIN JAVASCRIPT
   ============================================ */

/**
 * Periodic Table Application
 * A comprehensive interactive periodic table platform
 * 
 * @version 1.0.0
 * @author PeriodicTable Platform
 */

// ============================================
// APPLICATION STATE
// ============================================
const AppState = {
    elements: [],
    filteredElements: [],
    currentElement: null,
    darkMode: false
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================
const DOM = {};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the application
 */
async function initializeApp() {
    try {
        // Cache DOM elements
        cacheDOMElements();
        
        // Load element data
        await loadElements();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load user preferences
        loadUserPreferences();
        
        // Render periodic table
        renderPeriodicTable();
        
        // Render legend
        renderLegend();
        
        // Hide loading screen
        setTimeout(() => {
            hideLoadingScreen();
        }, 1500);
        
        console.log('Periodic Table initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
}

/**
 * Cache frequently accessed DOM elements
 */
function cacheDOMElements() {
    // Loading screen
    DOM.loadingScreen = document.getElementById('loading-screen');
    
    // Navigation
    DOM.searchInput = document.getElementById('search-input');
    DOM.darkModeToggle = document.getElementById('dark-mode-toggle');
    DOM.categoryFilter = document.getElementById('category-filter');
    
    // Periodic table
    DOM.periodicTable = document.getElementById('periodic-table');
    DOM.legendItems = document.getElementById('legend-items');
    
    // Element panel
    DOM.elementPanel = document.getElementById('element-panel');
    DOM.panelOverlay = document.getElementById('panel-overlay');
    DOM.panelClose = document.getElementById('panel-close');
}

// ============================================
// DATA LOADING
// ============================================
/**
 * Load elements from JSON file
 */
async function loadElements() {
    try {
        const response = await fetch('data/elements.json');
        if (!response.ok) {
            throw new Error('Failed to load elements data');
        }
        
        const data = await response.json();
        AppState.elements = data.elements;
        AppState.filteredElements = [...AppState.elements];
        
        console.log(`Loaded ${AppState.elements.length} elements`);
    } catch (error) {
        console.error('Error loading elements:', error);
        alert('Failed to load element data. Please refresh the page.');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Search functionality
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Category filter
    if (DOM.categoryFilter) {
        DOM.categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    // Dark mode toggle
    if (DOM.darkModeToggle) {
        DOM.darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Element panel
    if (DOM.panelClose) {
        DOM.panelClose.addEventListener('click', closeElementPanel);
    }
    
    if (DOM.panelOverlay) {
        DOM.panelOverlay.addEventListener('click', closeElementPanel);
    }
    
    // Panel tabs
    const panelTabs = document.querySelectorAll('.panel-tab');
    panelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchPanelTab(tabName);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ============================================
// PERIODIC TABLE RENDERING
// ============================================
/**
 * Render the periodic table
 */
function renderPeriodicTable() {
    if (!DOM.periodicTable) return;
    
    DOM.periodicTable.innerHTML = '';
    
    // Create a map for quick element lookup by position
    const elementMap = new Map();
    AppState.filteredElements.forEach(element => {
        const key = `${element.period}-${element.group}`;
        elementMap.set(key, element);
    });
    
    // Generate all 118 positions (7 periods x 18 groups)
    for (let period = 1; period <= 7; period++) {
        for (let group = 1; group <= 18; group++) {
            const key = `${period}-${group}`;
            const element = elementMap.get(key);
            
            if (element) {
                const elementCard = createElementCard(element);
                DOM.periodicTable.appendChild(elementCard);
            } else {
                // Add empty placeholder for layout
                const placeholder = document.createElement('div');
                placeholder.className = 'element-placeholder';
                placeholder.style.gridRow = period;
                placeholder.style.gridColumn = group;
                DOM.periodicTable.appendChild(placeholder);
            }
        }
    }
}

/**
 * Create an element card
 * @param {Object} element - Element data
 * @returns {HTMLElement} Element card
 */
function createElementCard(element) {
    const card = document.createElement('div');
    card.className = 'element-card';
    card.dataset.category = element.category;
    card.dataset.atomicNumber = element.atomicNumber;
    
    // Set grid position
    card.style.gridRow = element.period;
    card.style.gridColumn = element.group;
    
    // Element content
    card.innerHTML = `
        <div class="element-atomic-number">${element.atomicNumber}</div>
        <div class="element-symbol">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
    `;
    
    // Click handler
    card.addEventListener('click', () => {
        openElementPanel(element);
    });
    
    // Hover animation
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--element-color', getCategoryColor(element.category));
    });
    
    return card;
}

/**
 * Get category color
 * @param {string} category - Element category
 * @returns {string} Color hex code
 */
function getCategoryColor(category) {
    const colors = {
        'Alkali Metals': '#ef4444',
        'Alkaline Earth Metals': '#f97316',
        'Transition Metals': '#f59e0b',
        'Post-transition Metals': '#84cc16',
        'Metalloids': '#10b981',
        'Reactive Non-metals': '#06b6d4',
        'Noble Gases': '#3b82f6',
        'Lanthanides': '#8b5cf6',
        'Actinides': '#d946ef',
        'Unknown Properties': '#64748b'
    };
    return colors[category] || '#6366f1';
}

/**
 * Render the legend
 */
function renderLegend() {
    if (!DOM.legendItems) return;
    
    const categories = [
        'Alkali Metals',
        'Alkaline Earth Metals',
        'Transition Metals',
        'Post-transition Metals',
        'Metalloids',
        'Reactive Non-metals',
        'Noble Gases',
        'Lanthanides',
        'Actinides',
        'Unknown Properties'
    ];
    
    DOM.legendItems.innerHTML = categories.map(category => `
        <div class="legend-item" data-category="${category}">
            <div class="legend-color" style="background-color: ${getCategoryColor(category)}"></div>
            <span class="legend-label">${category}</span>
        </div>
    `).join('');
    
    // Add click handlers to legend items
    DOM.legendItems.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            DOM.categoryFilter.value = category;
            handleCategoryFilter();
        });
    });
}

// ============================================
// ELEMENT DETAIL PANEL
// ============================================
/**
 * Open element detail panel
 * @param {Object} element - Element data
 */
function openElementPanel(element) {
    AppState.currentElement = element;
    
    // Update panel content
    updateElementPanel(element);
    
    // Show panel
    DOM.elementPanel.classList.add('active');
    DOM.panelOverlay.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close element panel
 */
function closeElementPanel() {
    DOM.elementPanel.classList.remove('active');
    DOM.panelOverlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    AppState.currentElement = null;
}

/**
 * Update element panel content
 * @param {Object} element - Element data
 */
function updateElementPanel(element) {
    // Set element color
    const color = getCategoryColor(element.category);
    document.documentElement.style.setProperty('--element-color', color);
    
    // Basic info
    document.getElementById('panel-atomic-number').textContent = element.atomicNumber;
    document.getElementById('panel-symbol').textContent = element.symbol;
    document.getElementById('panel-name').textContent = element.name;
    document.getElementById('panel-atomic-mass').textContent = `${element.atomicMass} u`;
    document.getElementById('panel-category').textContent = element.category;
    document.getElementById('panel-state').textContent = element.stateAtRoomTemp;
    
    // Basic information
    document.getElementById('panel-group').textContent = element.group;
    document.getElementById('panel-period').textContent = element.period;
    document.getElementById('panel-block').textContent = element.block;
    document.getElementById('panel-electron-config').textContent = element.electronConfiguration;
    
    // Physical properties
    document.getElementById('panel-atomic-radius').textContent = `${element.atomicRadius} pm`;
    document.getElementById('panel-density').textContent = `${element.density} g/cm³`;
    document.getElementById('panel-melting-point').textContent = `${element.meltingPoint} K`;
    document.getElementById('panel-boiling-point').textContent = `${element.boilingPoint} K`;
    
    // Chemical properties
    document.getElementById('panel-electronegativity').textContent = element.electronegativity || 'N/A';
    document.getElementById('panel-oxidation-states').textContent = element.oxidationStates.join(', ');
    document.getElementById('panel-valence-electrons').textContent = element.valenceElectrons;
    
    // Discovery
    document.getElementById('panel-discovery-year').textContent = element.discoveryYear || 'Ancient';
    document.getElementById('panel-discovered-by').textContent = element.discoveredBy;
    document.getElementById('panel-natural-occurrence').textContent = element.naturalOccurrence;
    document.getElementById('panel-radioactivity').textContent = element.radioactivity ? 'Yes' : 'No';
    
    // Description and uses
    document.getElementById('panel-description').textContent = element.description;
    document.getElementById('panel-uses').textContent = element.uses;
    
    // Additional information
    document.getElementById('panel-interesting-facts').textContent = element.interestingFacts;
    document.getElementById('panel-safety-info').textContent = element.safetyInfo;
    document.getElementById('panel-health-hazards').textContent = element.healthHazards;
    document.getElementById('panel-environmental-impact').textContent = element.environmentalImpact;
    document.getElementById('panel-common-compounds').textContent = element.commonCompounds;
    document.getElementById('panel-isotopes').textContent = element.isotopes;
    document.getElementById('panel-history').textContent = element.history;
}

// ============================================
// PANEL TABS
// ============================================
/**
 * Switch panel tab
 * @param {string} tabName - Tab name to switch to
 */
function switchPanelTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab
    const selectedTab = document.querySelector(`.panel-tab[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Show selected tab content
    const selectedContent = document.getElementById(`tab-${tabName}`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

// ============================================
// SEARCH AND FILTER
// ============================================
/**
 * Handle search input
 * @param {Event} e - Input event
 */
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        AppState.filteredElements = [...AppState.elements];
    } else {
        AppState.filteredElements = AppState.elements.filter(element => {
            return (
                element.name.toLowerCase().includes(query) ||
                element.symbol.toLowerCase().includes(query) ||
                element.atomicNumber.toString().includes(query) ||
                element.category.toLowerCase().includes(query)
            );
        });
    }
    
    renderPeriodicTable();
}

/**
 * Handle category filter change
 */
function handleCategoryFilter() {
    const category = DOM.categoryFilter.value;
    
    if (category === 'all') {
        AppState.filteredElements = [...AppState.elements];
    } else {
        AppState.filteredElements = AppState.elements.filter(
            element => element.category === category
        );
    }
    
    renderPeriodicTable();
}

// ============================================
// DARK MODE
// ============================================
/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    
    if (AppState.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('darkMode', 'false');
    }
}

/**
 * Load user preferences
 */
function loadUserPreferences() {
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        AppState.darkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (DOM.searchInput) {
            DOM.searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Escape to close panel
    if (e.key === 'Escape' && AppState.currentElement) {
        closeElementPanel();
    }
}

// ============================================
// LEGAL MODAL
// ============================================
/**
 * Show legal modal with privacy or terms content
 * @param {string} type - 'privacy' or 'terms'
 */
function showLegalModal(type) {
    const modal = document.getElementById('legal-modal');
    const body = document.getElementById('legal-modal-body');
    
    const content = {
        privacy: `
            <h2>Privacy Policy</h2>
            <p>Last updated: 2024</p>
            <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our Interactive Periodic Table platform.</p>
            
            <h3>Information We Collect</h3>
            <p>We do not collect any personal information. The only data stored is your preferences (dark mode setting) and favorites list, which are saved locally in your browser using localStorage. This data never leaves your device.</p>
            
            <h3>How We Use Your Information</h3>
            <p>Local storage data is used solely to enhance your experience by remembering your preferences and saved elements between sessions.</p>
            
            <h3>Data Security</h3>
            <p>Since all data is stored locally on your device, no data transmission occurs. Your information remains private and under your control at all times.</p>
            
            <h3>Third-Party Services</h3>
            <p>We use Google Fonts for typography. Google may collect standard server logs when loading fonts. No other third-party services are used.</p>
            
            <h3>Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
            
            <h3>Contact</h3>
            <p>If you have questions about this Privacy Policy, please reach out via GitHub: <a href="https://github.com/muazamshah" target="_blank" rel="noopener noreferrer">MalakMughal772</a></p>
        `,
        terms: `
            <h2>Terms of Service</h2>
            <p>Last updated: 2024</p>
            <p>By using the Interactive Periodic Table platform, you agree to these Terms of Service.</p>
            
            <h3>Use of Service</h3>
            <p>This platform is provided for educational purposes. You may use it freely for personal, educational, and non-commercial purposes.</p>
            
            <h3>Intellectual Property</h3>
            <p>The element data is sourced from scientific databases and is publicly available. The code, design, and interface are original works protected under applicable copyright laws.</p>
            
            <h3>Limitation of Liability</h3>
            <p>While we strive for accuracy, element data may contain errors. This platform is provided "as is" without warranties of any kind. We are not liable for any damages arising from its use.</p>
            
            <h3>Acceptable Use</h3>
            <ul>
                <li>You may not use this service for any illegal purpose</li>
                <li>You may not attempt to disrupt or compromise the service</li>
                <li>You may not redistribute the element data without proper attribution</li>
            </ul>
            
            <h3>Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of any changes.</p>
            
            <h3>Governing Law</h3>
            <p>These terms are governed by applicable international laws regarding intellectual property and online services.</p>
        `
    };
    
    body.innerHTML = content[type] || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close legal modal
 */
function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    if (DOM.loadingScreen) {
        DOM.loadingScreen.classList.add('hidden');
    }
}

// ============================================
// EXPORT FOR TESTING
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        renderPeriodicTable,
        handleSearch,
        toggleDarkMode
    };
}
