# Interactive Periodic Table

A modern, beautiful, and fully interactive periodic table website built with HTML5, CSS3, and Vanilla JavaScript. Explore all 118 chemical elements with detailed information, interactive features, and educational resources.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

### Core Features
- **Complete Periodic Table**: All 118 elements with accurate scientific positioning
- **Detailed Element Information**: Comprehensive data for each element including:
  - Basic properties (atomic number, mass, symbol, name)
  - Physical properties (melting point, boiling point, density, atomic radius)
  - Chemical properties (electronegativity, oxidation states, electron configuration)
  - Discovery information (year, discoverer)
  - Uses and applications
  - Safety information and health hazards
  - Interesting facts and history

### Interactive Features
- **Instant Search**: Search elements by name, symbol, atomic number, or category
- **Category Filtering**: Filter elements by their chemical category
- **Dark Mode**: Toggle between light and dark themes
- **Favorites System**: Save and manage your favorite elements
- **Recently Viewed**: Track your recently viewed elements
- **Element Comparison**: Compare properties of two elements (UI ready)
- **Interactive Quiz**: Test your chemistry knowledge with multiple difficulty levels
- **AI Assistant Placeholder**: Ready for future AI integration

### Design Features
- **Premium UI**: Modern, minimalist design inspired by Apple, Google Material Design, and Notion
- **Fully Responsive**: Optimized for desktop, laptop, tablet, and mobile devices
- **Smooth Animations**: Beautiful transitions and micro-interactions
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Category Color Coding**: Visual distinction between element categories
- **Loading Animation**: Animated atom loader
- **Accessibility**: Keyboard navigation and screen reader support

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks or libraries
- **Local Storage**: Persist user preferences and favorites

## Project Structure

```
periodic-table/
├── index.html          # Main HTML file
├── styles.css          # Premium CSS styles
├── script.js           # Main JavaScript functionality
├── data/
│   └── elements.json   # Complete dataset of 118 elements
├── assets/
│   ├── icons/          # Icon files (ready for future use)
│   ├── images/         # Image assets (ready for future use)
│   └── videos/         # Video assets (ready for future use)
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone or download the project:
   ```bash
   git clone <repository-url>
   cd periodic-table
   ```

2. Open `index.html` in your web browser:
   ```bash
   # Option 1: Direct open
   open index.html
   
   # Option 2: Use a local server (recommended)
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` if using a server

## Usage

### Navigation

- **Search Bar**: Use the search bar to find elements by name, symbol, or atomic number
- **Category Filter**: Filter elements by selecting a category from the dropdown
- **Navigation Menu**: Switch between Table, Quiz, Compare, Favorites, and About sections
- **Dark Mode**: Click the sun/moon icon to toggle dark mode

### Element Interaction

- **Click any element** to open the detailed information panel
- **View comprehensive data** including physical, chemical, and historical information
- **Add to favorites** by clicking the heart icon in the element panel
- **Share element** information using the share button
- **Copy element data** to clipboard with the copy button

### Quiz Mode

1. Navigate to the Quiz section
2. Select difficulty level (Easy, Medium, Hard)
3. Click "Start Quiz" to begin
4. Answer 10 multiple-choice questions
5. View your score and performance message

### Keyboard Shortcuts

- `Ctrl/Cmd + K`: Focus search bar
- `Ctrl/Cmd + D`: Toggle dark mode
- `Escape`: Close modals and panels

## Element Categories

The periodic table includes 10 element categories, each with distinct colors:

- 🔴 **Alkali Metals** (Group 1)
- 🟠 **Alkaline Earth Metals** (Group 2)
- 🟡 **Transition Metals** (Groups 3-12)
- 🟢 **Post-transition Metals** (Groups 13-16)
- 🔵 **Metalloids** (Staircase elements)
- 🩵 **Reactive Non-metals** (Groups 14-17)
- 🔷 **Noble Gases** (Group 18)
- 🟣 **Lanthanides** (Rare earth elements)
- 🔮 **Actinides** (Radioactive elements)
- ⚫ **Unknown Properties** (Synthetic elements)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized rendering for smooth performance
- Debounced search for better UX
- Efficient DOM updates
- Local storage for persistent preferences
- Minimal dependencies (zero frameworks)

## Future Enhancements

The architecture is designed to support future features:

- [ ] User accounts and authentication
- [ ] Cloud sync for favorites and progress
- [ ] AI-powered element explanations
- [ ] 3D atom models
- [ ] Periodic trends graphs
- [ ] Chemistry calculator
- [ ] Learning courses and modules
- [ ] Achievements and certificates
- [ ] Offline mode with service workers
- [ ] Progress tracking
- [ ] Voice assistant integration
- [ ] PDF export functionality
- [ ] Advanced comparison tools
- [ ] Element relationship visualization

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License.

## Author

**PeriodicTable Platform**

## Acknowledgments

- Element data sourced from IUPAC and scientific databases
- Inspired by modern design principles from Apple, Google, and Notion
- Built for students, teachers, researchers, and chemistry enthusiasts worldwide

## Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Made with ❤️ for the chemistry community**