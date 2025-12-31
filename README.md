# Megalearn.se Website

Static website for Megalearn, hosted on GitHub Pages at [megalearn.github.io](https://megalearn.github.io).

## Project Structure

```
/
├── index.html              # Main landing page
├── css/
│   ├── styles.css          # Main styles
│   └── game-page.css       # Game detail page styles
├── js/
│   └── main.js             # Interaction logic
├── assets/
│   ├── fonts/              # Aspekta font files (woff2)
│   ├── images/             # Game screenshots
│   └── megalearn-logo.svg  # Logo
└── games/                  # Individual game pages
    ├── tao-kae-noi-world.html
    ├── vasa-ship.html
    ├── mega-museum-world.html
    ├── bloom.html
    └── finding-stubby.html
```

## Features

- **Single-page navigation**: Click section numbers (00-03) to expand/collapse content
- **Dynamic color themes**: Each section has its own color theme
- **Game preview on hover**: Hover over game names to see preview images
- **Responsive design**: Works on desktop and mobile devices

## Deployment to GitHub Pages

1. Create a repository named `megalearn.github.io`
2. Push this code to the `main` branch
3. Enable GitHub Pages in repository settings (Settings → Pages → Source: main branch)
4. Your site will be live at `https://megalearn.github.io`

## Adding Game Images

Place game screenshots in `assets/images/` with these filenames:
- `tao-kae-noi-world.png` (or .jpg, .gif)
- `vasa-ship.png`
- `mega-museum-world.png`
- `bloom.png`
- `finding-stubby.png`

## Fonts

This project uses the [Aspekta](https://github.com/ivodolenc/aspekta) font family (OFL v1.1 License).

## License

© 2024 Megalearn. All rights reserved.

