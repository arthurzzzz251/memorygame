# Multi-Game Entertainment Website

This is an entertainment website that collects various puzzle games, referencing the design style of CrazyGames, using an iframe framework structure for easy future updates and game additions.

## Website Structure

- **Home Page**: Displays popular games, game category navigation, and search functionality
- **Category Pages**: Shows games by category (Sudoku, Memory, Card Games, Mahjong, Fortune Telling, etc.)
- **Game Detail Pages**: Loads specific game content using iframes

## Technology Stack

- HTML5 + CSS3: Building page structure and styles
- Responsive Design: Adapting to different device sizes
- iframe Framework: Loading game content

## Directory Structure

```
/
├── index.html          # Website homepage
├── categories/         # Category pages
│   ├── sudoku.html     # Sudoku games category
│   ├── memory.html     # Memory games category
│   ├── cards.html      # Card games category
│   ├── mahjong.html    # Mahjong games category
│   └── fortune.html    # Fortune telling games category
├── games/              # Game resources directory
│   ├── sudoku/         # Sudoku games
│   ├── memory/         # Memory games
│   ├── cards/          # Card games
│   ├── mahjong/        # Mahjong games
│   └── fortune/        # Fortune telling games
├── css/                # Style files
│   ├── style.css       # Main styles
│   └── responsive.css  # Responsive styles
├── js/                 # JavaScript files
│   └── main.js         # Main scripts
└── assets/             # Resource files
    ├── images/         # Image resources
    ├── icons/          # Icon resources
    └── favicon.ico     # Website icon
```

## Page Design

### Home Page Design
- Top Navigation Bar: Website logo, category menu, search box, login/register buttons
- Carousel: Showcasing popular games
- Game Category Section: Displaying popular games from each category
- Footer: Website information, contact details, copyright information

### Game Category Page Design
- Category title and description
- Game card grid layout
- Pagination or infinite scroll loading

### Game Detail Page Design
- Game title and description
- iframe game area
- Related game recommendations

## Features

- Responsive design, adaptable for desktop and mobile devices
- Seamless loading of game content via iframes
- Game category navigation
- Game search functionality
- Popular game recommendations 