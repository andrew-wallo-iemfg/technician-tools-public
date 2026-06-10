# Technician Tools Hub

A personal web-based platform for organizing and showcasing technician tools and equipment.

## Features

- **Left Sidebar Navigation**: Easy navigation between Software and Hardware sections
- **Dark Theme Design**: Modern, professional GitHub-inspired UI
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Fast Navigation**: Click navigation and keyboard shortcuts (arrow keys)
- **Expandable Structure**: Easy to add new tools and categories

## Getting Started

1. Clone this repository
2. Open `index.html` in your web browser
3. Customize the content in each section by editing the HTML

## File Structure

```
.
├── index.html      # Main HTML file with sections
├── styles.css      # Styling and layout
├── script.js       # Navigation and interactivity
└── README.md       # This file
```

## Customization

### Adding Software Tools

Edit the "Software Section" in `index.html` and add cards for each tool:

```html
<div class="card">
    <h3>Tool Name</h3>
    <p>Tool description and details</p>
</div>
```

### Adding Hardware Tools

Edit the "Hardware Section" in `index.html` similarly.

### Color Scheme

Modify the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0969da;
    --sidebar-bg: #0d1117;
    /* ... more colors */
}
```

## Navigation

- **Mouse**: Click the navigation items in the left sidebar
- **Keyboard**: Use arrow keys (↑/↓) to navigate between sections

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Personal use repository

## Author

andrew-wallo-iemfg
