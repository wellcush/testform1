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

    // Convert nameOnCard to uppercase
    if (key === 'nameOnCard') {
        value = value.toUpperCase();
        event.target.value = value;  // Update the input field's displayed value
    }

    shippingInfo[key] = value;
}

function validateCardNumber(input) {
    let cardNumber = input.value.replace(/\D/g, '').substring(0, 16);
    cardNumber = cardNumber != '' ? cardNumber.match(/.{1,4}/g).join(' ') : '';
    input.value = cardNumber;
    shippingInfo.cardNumber = cardNumber;
}

function validateExpiry(input) {
    let expiryDate = input.value.replace(/\D/g, '').substring(0, 4);
    expiryDate = expiryDate != '' ? expiryDate.match(/.{1,2}/g).join('/') : '';
    input.value = expiryDate;
    shippingInfo.expiry = expiryDate;
}

function validateCVV(input) {
    let cvv = input.value.replace(/\D/g, '').substring(0, 4);
    input.value = cvv;
    shippingInfo.cvv = cvv;
}

// Handling form submission for the promo form
document.addEventListener("DOMContentLoaded", function() {
    const promoForm = document.getElementById('promo-form');
    promoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        let formData = new FormData(promoForm);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Implement successful submission logic, e.g., redirect or show a message
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Form submission failed, please try again.');
        });
    });

    // Other form logic
    document.getElementById('checkout-formal').addEventListener('submit', (event) => {
        // Existing code for checkout form submission
    });

    // Other code for input fields handling
    const inputFields = ['fullName', 'email', 'phone', 'address', 'city', 'zip', 'country', 'nameOnCard', 'cardNumber', 'expiry', 'cvv'];
    inputFields.forEach((inputField, index) => {
        const element = document.getElementById(inputField);
element.addEventListener('input', function(event) {
if (element.id === 'cardNumber') {
validateCardNumber(element);
} else if (element.id === 'expiry') {
validateExpiry(element);
} else if (element.id === 'cvv') {
validateCVV(element);
}
handleInputChange(event, element.id);
if (element.value.length === (element.maxLength || element.size)) {
const nextInput = inputFields[index + 1];
if (nextInput) {
document.getElementById(nextInput).focus();
}
}
});
});
document.getElementById('standardShipping').addEventListener('change', handleRadioChange);
document.getElementById('priorityShipping').addEventListener('change', handleRadioChange);
});

function handleRadioChange(event) {
shippingInfo.shippingMethod = event.target.value;
}

// Set default value for country field
document.addEventListener("DOMContentLoaded", function() {
const countryInput = document.getElementById('country');
if (countryInput) {
countryInput.value = 'United States';
}
});

// Additional code, if any, goes here
