/**
 * Cocktail Workshop Request Form — EmailJS (separate template from reservation)
 *
 * EMAILJS: Create a NEW template in EmailJS dashboard, e.g. "Workshop Request".
 * Use the SAME Public Key + Service ID as reservation, or point SERVICE_ID elsewhere.
 *
 * Template variables to add in EmailJS (Content):
 *   {{to_email}}          — your inbox (or fixed in template)
 *   {{from_name}}
 *   {{from_email}}
 *   {{phone}}
 *   {{participants}}
 *   {{workshop_date}}
 *   {{start_time}}
 *   {{notes}}
 *   {{message}}           — full plain-text summary (same as reservation pattern)
 *
 * Example subject: New workshop request — {{workshop_date}}
 *
 * Template ID is set in WORKSHOP_EMAILJS below (e.g. WR_frida).
 */

const WORKSHOP_EMAILJS = {
    PUBLIC_KEY: 'ZGVep5h3ZC-jo5vm2',
    SERVICE_ID: 'service_vh8u8pf',
    /** EmailJS template ID (dashboard → Email Templates) */
    TEMPLATE_ID: 'WR_frida'
};

const WORKSHOP_RULES = {
    minAdvanceDays: 5,
    /** How many eligible dates to show in the dropdown (Mon–Sat, from first bookable day) */
    dateOptionCount: 12,
    minParticipants: 10,
    maxParticipants: 30
};

(function initEmailJS() {
    if (typeof emailjs !== 'undefined' && WORKSHOP_EMAILJS.PUBLIC_KEY) {
        emailjs.init(WORKSHOP_EMAILJS.PUBLIC_KEY);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    initWorkshopDateSelect();
    initWorkshopForm();
    initWorkshopSuccessBlock();
});

function getLang() {
    return localStorage.getItem('fridaDiegoLang') || 'en';
}

function getFirstBookableDay(minAdvanceDays) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + minAdvanceDays);
    return d;
}

/**
 * Eligible: Monday–Saturday only, starting minAdvanceDays from today.
 */
function buildWorkshopDateList() {
    const out = [];
    let d = getFirstBookableDay(WORKSHOP_RULES.minAdvanceDays);
    while (out.length < WORKSHOP_RULES.dateOptionCount) {
        const day = d.getDay();
        if (day !== 0) out.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }
    return out;
}

function formatWorkshopOptionLabel(dateObj) {
    const lang = getLang();
    return dateObj.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function isoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function initWorkshopDateSelect() {
    const select = document.getElementById('workshop-date');
    if (!select) return;

    const fill = () => {
        const dates = buildWorkshopDateList();
        const placeholderEn = '— Select a date —';
        const placeholderDe = '— Datum wählen —';
        const ph = getLang() === 'de' ? placeholderDe : placeholderEn;
        select.innerHTML = `<option value="">${ph}</option>`;
        dates.forEach((d) => {
            const opt = document.createElement('option');
            opt.value = isoDate(d);
            opt.textContent = formatWorkshopOptionLabel(d);
            select.appendChild(opt);
        });
    };

    fill();

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setTimeout(fill, 120);
        });
    }
}

function initWorkshopSuccessBlock() {
    const btn = document.getElementById('workshop-another-btn');
    const form = document.getElementById('workshop-form');
    const success = document.getElementById('workshop-success');
    const msg = document.getElementById('workshop-form-message');

    if (btn && form && success) {
        btn.addEventListener('click', () => {
            success.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            success.style.opacity = '0';
            success.style.transform = 'translateY(10px)';
            setTimeout(() => {
                success.style.display = 'none';
                if (msg) {
                    msg.textContent = '';
                    msg.className = 'form-message';
                }
                form.style.display = 'block';
                form.style.opacity = '0';
                form.style.transform = 'translateY(20px)';
                void form.offsetWidth;
                form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
                initWorkshopDateSelect();
            }, 300);
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle && success) {
        langToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (success.style.display === 'block') {
                    updateWorkshopSuccessTranslations(success, getLang());
                }
            }, 100);
        });
    }
}

function updateWorkshopSuccessTranslations(container, lang) {
    container.querySelectorAll('[data-en][data-de]').forEach((el) => {
        const t = el.getAttribute(`data-${lang}`);
        if (t) el.innerHTML = t;
    });
}

function initWorkshopForm() {
    const form = document.getElementById('workshop-form');
    if (!form) return;
    form.addEventListener('submit', handleWorkshopSubmit);
}

async function handleWorkshopSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.reservation-submit-btn');
    const messageDiv = document.getElementById('workshop-form-message');

    submitBtn.disabled = true;
    const sendingEn = 'Sending...';
    const sendingDe = 'Wird gesendet...';
    submitBtn.innerHTML = `<span>${getLang() === 'de' ? sendingDe : sendingEn}</span>`;

    if (messageDiv) {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }

    const participants = parseInt(form.querySelector('#participants').value, 10);
    const data = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        participants,
        date: form.querySelector('#workshop-date').value,
        time: form.querySelector('#workshop-time').value,
        notes: form.querySelector('#notes').value.trim() || '—'
    };

    if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.date ||
        !data.time ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
        showWorkshopMessage(
            messageDiv,
            'error',
            'Please fill in all required fields.',
            'Bitte füllen Sie alle Pflichtfelder aus.'
        );
        resetWorkshopSubmitBtn(submitBtn);
        return;
    }

    if (
        Number.isNaN(participants) ||
        participants < WORKSHOP_RULES.minParticipants ||
        participants > WORKSHOP_RULES.maxParticipants
    ) {
        showWorkshopMessage(
            messageDiv,
            'error',
            `Minimum ${WORKSHOP_RULES.minParticipants} and maximum ${WORKSHOP_RULES.maxParticipants} participants.`,
            `Mindestens ${WORKSHOP_RULES.minParticipants} und höchstens ${WORKSHOP_RULES.maxParticipants} Teilnehmende.`
        );
        resetWorkshopSubmitBtn(submitBtn);
        return;
    }

    const formattedDate = formatDateLong(data.date);

    const message =
        `New Cocktail Workshop Request\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Participants: ${data.participants}\n` +
        `Preferred date: ${formattedDate}\n` +
        `Start time: ${data.time}\n` +
        `Notes: ${data.notes}`;

    const templateParams = {
        to_email: 'fridaunddiego.berlin@gmail.com',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        participants: String(data.participants),
        workshop_date: formattedDate,
        start_time: data.time,
        notes: data.notes,
        message
    };

    try {
        if (typeof emailjs === 'undefined') {
            showWorkshopMessage(
                messageDiv,
                'error',
                'Email service is not available. Please call +49 30 23299629 or email fridaunddiego.berlin@gmail.com',
                'E-Mail-Service nicht verfügbar. Bitte anrufen +49 30 23299629 oder E-Mail an fridaunddiego.berlin@gmail.com'
            );
            resetWorkshopSubmitBtn(submitBtn);
            return;
        }

        await emailjs.send(
            WORKSHOP_EMAILJS.SERVICE_ID,
            WORKSHOP_EMAILJS.TEMPLATE_ID,
            templateParams
        );

        const successBlock = document.getElementById('workshop-success');
        if (successBlock) {
            form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            form.style.opacity = '0';
            form.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                form.style.display = 'none';
                updateWorkshopSuccessTranslations(successBlock, getLang());
                successBlock.style.display = 'block';
                successBlock.style.opacity = '0';
                successBlock.style.transform = 'translateY(20px)';
                void successBlock.offsetWidth;
                successBlock.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                successBlock.style.opacity = '1';
                successBlock.style.transform = 'translateY(0)';
            }, 300);
        } else if (messageDiv) {
            showWorkshopMessage(
                messageDiv,
                'success',
                'We’ve got your request! We will call you shortly to confirm.',
                'Wir haben Ihre Anfrage erhalten! Wir rufen Sie in Kürze zur Bestätigung an.'
            );
        }

        form.reset();
    } catch (err) {
        console.error('Workshop EmailJS error:', err);
        showWorkshopMessage(
            messageDiv,
            'error',
            'Something went wrong. Please call +49 30 23299629 or email fridaunddiego.berlin@gmail.com',
            'Etwas ist schiefgelaufen. Bitte anrufen +49 30 23299629 oder E-Mail an fridaunddiego.berlin@gmail.com'
        );
    } finally {
        resetWorkshopSubmitBtn(submitBtn);
    }
}

function formatDateLong(dateString) {
    const date = new Date(dateString + 'T12:00:00');
    const lang = getLang();
    return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showWorkshopMessage(el, type, en, de) {
    if (!el) return;
    el.className = `form-message ${type}`;
    el.textContent = getLang() === 'de' ? de : en;
    el.setAttribute('data-en', en);
    el.setAttribute('data-de', de);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetWorkshopSubmitBtn(btn) {
    btn.disabled = false;
    const en = 'Submit request';
    const de = 'Anfrage senden';
    const t = getLang() === 'de' ? de : en;
    btn.innerHTML = `<span data-en="${en}" data-de="${de}">${t}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>`;
}
