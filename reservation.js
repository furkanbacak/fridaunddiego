/**
 * Reservation Form Handler
 * Uses EmailJS to send reservation emails
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up for free at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{to_email}}
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{phone}}
 *    - {{guests}}
 *    - {{date}}
 *    - {{time}}
 *    - {{special_requests}}
 *    - {{message}}
 * 4. Get your Public Key, Service ID, and Template ID from EmailJS dashboard
 * 5. Replace the placeholders below with your actual values
 */

// EmailJS Configuration - REPLACE WITH YOUR VALUES
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'ZGVep5h3ZC-jo5vm2',      // From EmailJS Account > API Keys
    SERVICE_ID: 'service_vh8u8pf',       // From EmailJS Email Services
    TEMPLATE_ID: 'template_ki2g6sh'      // From EmailJS Email Templates
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    initReservationForm();
    initDatePicker();
    initPlaceholderLanguage();
    initFormMessageLanguage();
});

/**
 * Update form messages when language changes
 */
function initFormMessageLanguage() {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) return;
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setTimeout(() => {
                const lang = localStorage.getItem('fridaDiegoLang') || 'en';
                const enText = messageDiv.getAttribute('data-en');
                const deText = messageDiv.getAttribute('data-de');
                if (enText && deText && messageDiv.textContent) {
                    messageDiv.textContent = lang === 'de' ? deText : enText;
                }
                
                // Update page title
                if (lang === 'de') {
                    document.title = 'Reservierung | Frida & Diego';
                } else {
                    document.title = 'Reservation | Frida & Diego';
                }
            }, 100);
        });
    }
}

/**
 * Initialize reservation form
 */
function initReservationForm() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.reservation-submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span data-en="Sending..." data-de="Wird gesendet...">Sending...</span>';
    
    // Clear previous messages
    messageDiv.className = 'form-message';
    messageDiv.textContent = '';
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        guests: form.querySelector('#guests').value,
        date: form.querySelector('#date').value,
        time: form.querySelector('#time').value,
        specialRequests: form.querySelector('#special-requests').value.trim() || 'None'
    };
    
    // Validate form
    if (!validateForm(formData)) {
        showMessage(messageDiv, 'error', 'Please fill in all required fields.', 'Bitte füllen Sie alle Pflichtfelder aus.');
        resetSubmitButton(submitBtn);
        return;
    }
    
    // Format date for display
    const formattedDate = formatDate(formData.date);
    
    // Prepare email template parameters
    const templateParams = {
        to_email: 'fridaunddiego.berlin@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        date: formattedDate,
        time: formData.time,
        special_requests: formData.specialRequests,
        message: `New Reservation Request\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGuests: ${formData.guests}\nDate: ${formattedDate}\nTime: ${formData.time}\nSpecial Requests: ${formData.specialRequests}`
    };
    
    try {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
            EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            // EmailJS not configured - use mailto fallback
            const subject = encodeURIComponent(`Reservation Request - ${formattedDate} at ${formData.time}`);
            const body = encodeURIComponent(
                `New Reservation Request\n\n` +
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone}\n` +
                `Guests: ${formData.guests}\n` +
                `Date: ${formattedDate}\n` +
                `Time: ${formData.time}\n` +
                `Special Requests: ${formData.specialRequests}\n\n` +
                `---\n` +
                `This reservation was submitted through the website form.`
            );
            const mailtoLink = `mailto:fridaunddiego.berlin@gmail.com?subject=${subject}&body=${body}`;
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Show success message
            showMessage(messageDiv, 'success',
                'Opening your email client... Please send the email to complete your reservation.',
                'E-Mail-Client wird geöffnet... Bitte senden Sie die E-Mail, um Ihre Reservierung abzuschließen.'
            );
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
            }, 2000);
            
            resetSubmitButton(submitBtn);
            return;
        }
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            showMessage(messageDiv, 'error',
                'Email service is not available. Please contact us directly at fridaunddiego.berlin@gmail.com',
                'E-Mail-Service ist nicht verfügbar. Bitte kontaktieren Sie uns direkt unter fridaunddiego.berlin@gmail.com'
            );
            resetSubmitButton(submitBtn);
            return;
        }
        
        // Send email using EmailJS
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        // Success
        showMessage(messageDiv, 'success', 
            'Reservation request sent successfully! We will contact you soon to confirm.',
            'Reservierungsanfrage erfolgreich gesendet! Wir werden Sie bald kontaktieren, um zu bestätigen.'
        );
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // Provide more specific error messages
        let errorMessageEn = 'Sorry, there was an error sending your reservation. Please contact us directly at fridaunddiego.berlin@gmail.com or call us.';
        let errorMessageDe = 'Entschuldigung, beim Senden Ihrer Reservierung ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns direkt unter fridaunddiego.berlin@gmail.com oder rufen Sie uns an.';
        
        if (error.text) {
            // EmailJS specific error
            if (error.text.includes('Invalid') || error.text.includes('not found')) {
                errorMessageEn = 'Email service configuration error. Please contact us directly at fridaunddiego.berlin@gmail.com';
                errorMessageDe = 'E-Mail-Service-Konfigurationsfehler. Bitte kontaktieren Sie uns direkt unter fridaunddiego.berlin@gmail.com';
            }
        }
        
        showMessage(messageDiv, 'error', errorMessageEn, errorMessageDe);
    } finally {
        resetSubmitButton(submitBtn);
    }
}

/**
 * Validate form data
 */
function validateForm(data) {
    return data.name && 
           data.email && 
           data.phone && 
           data.guests && 
           data.date && 
           data.time &&
           isValidEmail(data.email);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Show success or error message
 */
function showMessage(messageDiv, type, enText, deText) {
    messageDiv.className = `form-message ${type}`;
    const currentLang = localStorage.getItem('fridaDiegoLang') || 'en';
    messageDiv.textContent = currentLang === 'de' ? deText : enText;
    messageDiv.setAttribute('data-en', enText);
    messageDiv.setAttribute('data-de', deText);
    
    // Update message when language changes
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const updateMessage = () => {
            const lang = localStorage.getItem('fridaDiegoLang') || 'en';
            messageDiv.textContent = lang === 'de' ? deText : enText;
        };
        langToggle.addEventListener('click', updateMessage);
    }
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Reset submit button
 */
function resetSubmitButton(btn) {
    btn.disabled = false;
    const currentLang = localStorage.getItem('fridaDiegoLang') || 'en';
    const submitText = currentLang === 'de' ? 'Reservierung absenden' : 'Submit Reservation';
    btn.innerHTML = `<span data-en="Submit Reservation" data-de="Reservierung absenden">${submitText}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>`;
}

/**
 * Initialize date picker with minimum date
 */
function initDatePicker() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Set minimum date to tomorrow (or today if you allow same-day reservations)
    dateInput.setAttribute('min', today.toISOString().split('T')[0]);
}

/**
 * Initialize placeholder language based on current language
 */
function initPlaceholderLanguage() {
    const textarea = document.querySelector('#special-requests');
    if (!textarea) return;
    
    const updatePlaceholder = () => {
        const currentLang = localStorage.getItem('fridaDiegoLang') || 'en';
        const placeholder = currentLang === 'de' 
            ? textarea.getAttribute('data-de-placeholder')
            : textarea.getAttribute('data-en-placeholder');
        textarea.placeholder = placeholder || '';
    };
    
    updatePlaceholder();
    
    // Update placeholder when language changes
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setTimeout(updatePlaceholder, 100);
        });
    }
}
