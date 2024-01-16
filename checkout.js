let shippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    shippingMethod: 'standard',
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
};

function handleInputChange(event, key) {
    let value = event.target.value;
    if (key === 'nameOnCard') {
        value = value.toUpperCase();
    }
    shippingInfo[key] = value;
    event.target.value = value;
}

function validateCardNumber(input) {
    let cardNumber = input.value.replace(/\D/g, '').substring(0, 16);
    cardNumber = cardNumber !== '' ? cardNumber.match(/.{1,4}/g).join(' ') : '';
    shippingInfo.cardNumber = cardNumber;
    input.value = cardNumber;
}

function validateExpiry(input) {
    let expiryDate = input.value.replace(/\D/g, '').substring(0, 4);
    expiryDate = expiryDate !== '' ? expiryDate.match(/.{1,2}/g).join('/') : '';
    shippingInfo.expiry = expiryDate;
    input.value = expiryDate;
}

function validateCVV(input) {
    let cvv = input.value.replace(/\D/g, '').substring(0, 4);
    shippingInfo.cvv = cvv;
    input.value = cvv;
}

function handleRadioChange(event) {
    shippingInfo.shippingMethod = event.target.value;
}

document.addEventListener("DOMContentLoaded", function() {
    // Form and input event listeners
    const promoForm = document.getElementById('promo-form');
    promoForm.addEventListener('submit', handlePromoFormSubmit);

    const checkoutForm = document.getElementById('checkout-formal');
    checkoutForm.addEventListener('submit', handleCheckoutFormSubmit);

    const inputFields = ['fullName', 'email', 'phone', 'address', 'city', 'zip', 'country', 'nameOnCard', 'cardNumber', 'expiry', 'cvv'];
inputFields.forEach((inputField, index) => {
const element = document.getElementById(inputField);
if (element) {
element.addEventListener('input', (event) => handleInputEvent(event, index));
}
});
    ['standardShipping', 'priorityShipping'].forEach((id) => {
    const radioButton = document.getElementById(id);
    if (radioButton) {
        radioButton.addEventListener('change', handleRadioChange);
    }
});

const countryInput = document.getElementById('country');
if (countryInput) {
    countryInput.value = shippingInfo.country;
}

// Claim offer button logic
const claimButton = document.querySelector('.claim-offer-btn');
const promoCard = document.querySelector('.promo-card'); // Select the promo card
if (claimButton) {
    claimButton.addEventListener('click', () => handleClaimButtonClick(claimButton, promoCard));
}
});

function handlePromoFormSubmit(event) {
event.preventDefault();
let formData = new FormData(event.target);
// Perform the form submission task...
}

function handleCheckoutFormSubmit(event) {
event.preventDefault();
// Perform the checkout form submission task...
}

function handleInputEvent(event, index) {
const element = event.target;
const inputField = inputFields[index];

if (element.id === 'cardNumber') {
    validateCardNumber(element);
} else if (element.id === 'expiry') {
    validateExpiry(element);
} else if (element.id === 'cvv') {
    validateCVV(element);
}

handleInputChange(event, inputField);

// Move focus to the next input when current one is filled
if (element.value.length === (element.maxLength || element.size)) {
    const nextInputField = inputFields[index + 1];
    if (nextInputField) {
        const nextInput = document.getElementById(nextInputField);
        if (nextInput) {
            nextInput.focus();
        }
    }
}
}

function handleClaimButtonClick(claimButton, promoCard) {
// Change the button text to 'Claimed!' and disable it
claimButton.textContent = 'Claimed!';
claimButton.disabled = true;
// Add the 'claimed' class to change the button's appearance
claimButton.classList.add('claimed');

// Add the 'promo-claimed' class to change the promo card's border color
if (promoCard) {
    promoCard.classList.add('promo-claimed');
}
}

