const nav = document.querySelector('.navbar');
const menu = document.querySelector('.menu-btn');

if (menu) {
    menu.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// Highlight active navigation link
document.querySelectorAll('.navbar a').forEach(a => {
    const currentPage = location.pathname.split('/').pop();

    if (
        a.getAttribute('href') === currentPage ||
        (!currentPage && a.getAttribute('href') === 'index.html')
    ) {
        a.classList.add('active');
    }
});

// Date and time display
function updateDateTime() {
    const el = document.getElementById('dateTime');

    if (el) {
        el.textContent = 'Current date and time: ' + new Date().toLocaleString();
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Welcome message
if (document.body.dataset.welcomed !== 'true') {
    console.log('Welcome to Edward’s Housing Agency');
    document.body.dataset.welcomed = 'true';
}

// Image slider
const images = [
    'images/house1.webp',
    'images/house2.webp',
    'images/house3.webp',
    'images/community.svg',
    'images/family-home.svg'
];

let slide = 0;
const slider = document.getElementById('sliderImage');

function showSlide() {
    if (slider) {
        slider.src = images[slide];
        slider.alt = 'Housing image ' + (slide + 1);
    }
}

document.getElementById('nextSlide')?.addEventListener('click', () => {
    slide = (slide + 1) % images.length;
    showSlide();
});

document.getElementById('prevSlide')?.addEventListener('click', () => {
    slide = (slide - 1 + images.length) % images.length;
    showSlide();
});

// FAQ show/hide section
document.querySelectorAll('.faq button').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.nextElementSibling.classList.toggle('show');
    });
});

// Loan calculator
document.getElementById('calcLoan')?.addEventListener('click', () => {
    const P = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const months = parseFloat(document.getElementById('loanYears').value) * 12;
    const out = document.getElementById('calcResult');

    if (!P || !months || isNaN(rate)) {
        out.textContent = 'Please enter loan amount, interest rate and years.';
        return;
    }

    let payment;

    if (rate === 0) {
        payment = P / months;
    } else {
        payment =
            P *
            rate *
            Math.pow(1 + rate, months) /
            (Math.pow(1 + rate, months) - 1);
    }

    out.textContent =
        'Estimated monthly payment: JMD $' +
        payment.toLocaleString(undefined, {
            maximumFractionDigits: 2
        });
});

// Contact form validation
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    const out = document.getElementById('formMessage');

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9()+\-\s]{7,}$/.test(phone);

    if (!name || !email || !phone || !service || !message) {
        out.textContent = 'Please complete all fields before submitting.';
        out.style.color = 'crimson';
        return;
    }

    if (!emailOk) {
        out.textContent = 'Please enter a valid email address.';
        out.style.color = 'crimson';
        return;
    }

    if (!phoneOk) {
        out.textContent = 'Please enter a valid phone number.';
        out.style.color = 'crimson';
        return;
    }

    out.style.color = 'green';
    out.textContent =
        'Thank you, ' +
        name +
        '. Your ' +
        service +
        ' enquiry has been received.';

    e.target.reset();
});