# Frida & Diego 🌮🍹

A beautiful, bilingual website for **Frida & Diego** — a Mexican Restaurant & Cocktail Bar located in the heart of Berlin Schöneberg's Rainbow District (Regenbogenkiez).

## 🎨 Design

The website design is inspired by the legendary Mexican artistic couple **Frida Kahlo** and **Diego Rivera**, featuring:

- Deep forest green and golden mustard color palette (matched to the restaurant's logo)
- Terracotta red accents
- Artistic typography with Playfair Display and Josefin Sans fonts
- Smooth animations and scroll effects
- Responsive design for all devices

## 🌐 Features

- **Bilingual Support**: Full English/German language toggle with localStorage persistence
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Sections**:
  - Hero with logo and call-to-action
  - About section with concept, atmosphere, and location info
  - Menu section with food categories
  - Drinks section featuring signature cocktails
  - Contact section with address, hours, and embedded map
- **Accessibility**: Screen reader support, reduced motion preferences, semantic HTML
- **Performance**: Optimized CSS animations, lazy-loaded map

## 📁 File Structure

```
frida-diego-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Language toggle and interactivity
├── frida-diego-logo.jpeg   # Restaurant logo
├── menu-food.pdf       # Food menu (to be added)
├── menu-drinks.pdf     # Drinks menu (to be added)
└── README.md           # This file
```

## 🛠 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript** - Vanilla JS (no frameworks)
- **Google Fonts** - Playfair Display, Libre Baskerville, Josefin Sans

## 🚀 Getting Started

Simply open `index.html` in a web browser. No build process required!

For local development with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve
```

Then open `http://localhost:8000` in your browser.

## 📍 Restaurant Info

**Frida & Diego**  
Fuggerstraße 28  
10777 Berlin (Schöneberg)

**Opening Hours**: Daily 17:00 – Midnight

**Getting There**:
- U-Bahn: Wittenbergplatz (U1, U2, U3)
- U-Bahn: Nollendorfplatz

## 📝 Adding Menu PDFs

To add downloadable menu PDFs:

1. Add your PDF files to the project root (e.g., `menu-food.pdf`, `menu-drinks.pdf`)
2. Add download links in the HTML where needed:

```html
<a href="menu-food.pdf" download class="menu-download">Download Menu (PDF)</a>
```

## 🎭 Credits

- Design & Development: Created with ❤️
- Inspired by Frida Kahlo & Diego Rivera
- Logo: Frida & Diego Restaurant

---

**Viva La Vida! 🌺**

