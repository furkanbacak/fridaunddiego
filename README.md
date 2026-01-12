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
- **Reservation System**: Online reservation form with email notifications
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
├── reservation.html        # Reservation page with form
├── styles.css              # Main website styles
├── menu-page.css           # Menu page styles
├── script.js               # Language toggle and interactivity
├── reservation.js          # Reservation form handler (EmailJS)
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
- **EmailJS** - Email service for reservation form
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

## 📧 EmailJS Setup (Reservation Form)

The reservation form uses EmailJS to send emails. Follow these steps to set it up:

1. **Sign up for EmailJS** (free account): https://www.emailjs.com/

2. **Create an Email Service**:
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail recommended)
   - Follow the setup instructions
   - Copy your **Service ID**

3. **Create an Email Template**:
   - Go to Email Templates → Create New Template
   - Set "To Email" to: `fridaunddiego.berlin@gmail.com`
   - Set "From Name" to: `{{from_name}}`
   - Set "From Email" to: `{{from_email}}`
   - Set "Subject" to: `New Reservation Request - {{date}} at {{time}}`
   - In the email body, use these variables:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Phone: {{phone}}
     Guests: {{guests}}
     Date: {{date}}
     Time: {{time}}
     Special Requests: {{special_requests}}
     ```
   - Copy your **Template ID**

4. **Get your Public Key**:
   - Go to Account → General → API Keys
   - Copy your **Public Key**

5. **Update `reservation.js`**:
   - Open `reservation.js`
   - Find the `EMAILJS_CONFIG` object at the top
   - Replace the placeholder values:
     ```javascript
     const EMAILJS_CONFIG = {
         PUBLIC_KEY: 'your-public-key-here',
         SERVICE_ID: 'your-service-id-here',
         TEMPLATE_ID: 'your-template-id-here'
     };
     ```

6. **Test the form**:
   - Open `reservation.html` in your browser
   - Fill out and submit a test reservation
   - Check your email inbox for the reservation notification

That's it! The reservation form will now send emails to `fridaunddiego.berlin@gmail.com` whenever someone makes a reservation.

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
