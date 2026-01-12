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
- **Separate Menu Page**: Mobile-optimized menu page perfect for QR code scanning at tables
- **Sections**:
  - Hero with logo and call-to-action
  - About section with concept, atmosphere, and location info
  - Menu section with food categories
  - Drinks section featuring signature cocktails & beverages
  - Contact section with address, hours, Instagram & Google Reviews links
  - Legal section with allergens & additives (LMIV compliance)
- **Social Integration**: Instagram (@fridaunddiego) and Google Reviews links
- **Accessibility**: Screen reader support, reduced motion preferences, semantic HTML
- **Performance**: Optimized CSS animations, lazy-loaded map

## 📱 QR Code Menu

The separate `menu.html` page is optimized for restaurant table QR codes:

- **Mobile-first design** - Touch-friendly interface
- **Tab navigation** - Easy switching between Food, Cocktails, and Drinks
- **Sticky header** - Logo and language toggle always accessible
- **Collapsible allergen info** - German LMIV compliance
- **PDF download links** - Full menus available

## 📁 File Structure

```
frida-diego-website/
├── index.html              # Main website
├── menu.html               # Separate menu page (QR code optimized)
├── styles.css              # Main website styles
├── menu-page.css           # Menu page styles
├── script.js               # Language toggle and interactivity
├── frida-diego-logo.png    # Restaurant logo (transparent)
├── frida-diego-logo.jpeg   # Restaurant logo (original)
├── Frida-Diego-Food-Menu.pdf    # Food menu PDF
├── Frida-Diego-Cocktail-Menu.pdf      # Cocktail menu PDF
└── README.md               # This file
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
python -m http.server 8080

# Using Node.js (npx)
npx serve
```

Then open `http://localhost:8080` in your browser.

## 📱 Creating QR Codes

For the restaurant table QR codes, generate a QR code pointing to:
- Your deployed `menu.html` URL (e.g., `https://yourdomain.com/menu.html`)

The menu page is specifically designed for mobile scanning and browsing.

## 📍 Restaurant Info

**Frida & Diego**  
Fuggerstraße 28  
10777 Berlin (Schöneberg)

**Opening Hours**: Daily 17:00 – Midnight

**Getting There**:
- U-Bahn: Wittenbergplatz (U1, U2, U3)
- U-Bahn: Nollendorfplatz

**Social**:
- Instagram: [@fridaunddiego](https://instagram.com/fridaunddiego)
- [Leave a Google Review](https://share.google/JZHSs9rwtgosXiVL3)

## 🎭 Credits

- Design & Development: Created with ❤️
- Inspired by Frida Kahlo & Diego Rivera
- Logo: Frida & Diego Restaurant

---

**Viva La Vida! 🌺**
