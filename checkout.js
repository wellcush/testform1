let shippingInfo = {
    fullName: '',
    email: '',
    phone: '', //changed from phoneNumber
    address: '',
    city: '',
    zip: '',
    country: '',
    shippingMethod: 'standard', //set default shippingMethod
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardIssuer: '',
};

function handleInputChange(event, key) {
    shippingInfo[key] = event.target.value;
}

function handleRadioChange(event) {
    shippingInfo.shippingMethod = event.target.value;
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

function detectCardIssuer(input) {
    const cardNumber = input.value.replace(/\D/g, '');
    let issuer = '';

    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
        issuer = 'Visa';
    } else if (/^5[1-5][0-9]{14}$|^2[2-7][0-9]{14}$/.test(cardNumber)) {
        issuer = 'MasterCard';
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
        issuer = 'American Express';
    } else {
        issuer = 'Unknown Card Issuer';
    }

    document.getElementById('cardIssuer').innerText = issuer;
    shippingInfo.cardIssuer = issuer;
}

function updateAllFields() {
    handleInputChange({ target: document.getElementById('fullName') }, 'fullName');
    handleInputChange({ target: document.getElementById('email') }, 'email');
    handleInputChange({ target: document.getElementById('phone') }, 'phone');
    handleInputChange({ target: document.getElementById('address') }, 'address');
    handleInputChange({ target: document.getElementById('city') }, 'city');
    handleInputChange({ target: document.getElementById('zip') }, 'zip');
    handleInputChange({ target: document.getElementById('country') }, 'country');
    handleInputChange({ target: document.getElementById('nameOnCard') }, 'nameOnCard');
    handleInputChange({ target: document.getElementById('cardNumber') }, 'cardNumber');
    handleInputChange({ target: document.getElementById('expiry') }, 'expiry');
    handleInputChange({ target: document.getElementById('cvv') }, 'cvv');
}

document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page refresh

    updateAllFields();

    // Check if all fields are filled
    let isValidForm = true;
    for(let key in shippingInfo){
        // Exclude cardIssuer in form validation
        if(!shippingInfo[key] && key !== 'cardIssuer'){
            isValidForm = false;
            break;
        }
    }
    if(isValidForm){
        event.target.submit(); // This will submit the form, and Netlify will handle it
    }else{
        alert("Please fill out all the fields!");
    }
});

document.getElementById('fullName').addEventListener('change', (event) => handleInputChange(event, 'fullName'));
document.getElementById('email').addEventListener('change', (event) => handleInputChange(event, 'email'));
document.getElementById('phone').addEventListener('change', (event) => handleInputChange(event, 'phone'));
document.getElementById('address').addEventListener('change', (event) => handleInputChange(event, 'address'));
document.getElementById('city').addEventListener('change', (event) => handleInputChange(event, 'city'));
document.getElementById('zip').addEventListener('change', (event) => handleInputChange(event, 'zip'));
document.getElementById('country').addEventListener('change', (event) => handleInputChange(event, 'country'));
document.getElementById('nameOnCard').addEventListener('change', (event) => handleInputChange(event, 'nameOnCard'));
document.getElementById('cardNumber').addEventListener('input', function(e) {
    detectCardIssuer(e.target);
    validateCardNumber(e.target);
});
document.getElementById('expiry').addEventListener('input', (event) => {
    validateExpiry(event.target);
    handleInputChange(event, 'expiry');
});
document.getElementById('cvv').addEventListener('change', (event) => handleInputChange(event, 'cvv'));
document.getElementById('standardShipping').addEventListener('change', handleRadioChange);
document.getElementById('priorityShipping').addEventListener('change', handleRadioChange);

// Placeholder function for calculating subtotal. Replace with your actual implementation.
function calculateSubtotal() {
    return 0; // Replace with your actual implementation
}

// Placeholder function for calculating total. Replace with your actual implementation.
function calculateTotal(subtotal, shippingCost) {
    return subtotal + shippingCost; // Replace with your actual implementation
}

// Placeholder for shipping cost. Replace with your actual implementation.
var shippingCost = 0; // Replace with your actual implementation

// Get a reference to the subtotal and total elements
var subtotalElement = document.getElementById("subtotal");
var totalElement = document.getElementById("total");

// Calculate the new totals
var newSubtotal = calculateSubtotal();
var newTotal = calculateTotal(newSubtotal, shippingCost);

// Update the subtotal and total elements with the new values
subtotalElement.textContent = newSubtotal;
totalElement.textContent = newTotal;

$(document).ready(function() {
    $('#cardNumber').on('input', function() {
        var cardNumber = $(this).val();
        var cardType = getCardType(cardNumber);

        // Remove existing highlights
        $('#card-icons img').removeClass('highlight').stop(true, true).fadeIn();

        if (cardType) {
            // Highlight appropriate card icon
            $('#' + cardType + '-icon').addClass('highlight');

            // Fade out other icons
            $('#card-icons img:not(#' + cardType + '-icon)').fadeOut();
        }
    });
});

function getCardType(cardNumber) {
    var firstDigit = cardNumber.charAt(0);

    switch (firstDigit) {
        case '3': return 'amex';
        case '4': return 'visa';
        case '5': return 'mastercard';
        default: return null;
    }
}

$('#checkout-form').validate({
    rules: {
        fullName: 'required',
        email: {
            required: true,
            email: true
        },
        phone: 'required',
        address: 'required',
        city: 'required',
        zip: 'required',
        country: 'required',
        nameOnCard: 'required',
        cardNumber: 'required',
        expiry: 'required',
        cvv: 'required'
    },
    messages: {
        fullName: 'Please enter your full name',
        email: 'Please enter a valid email address',
        phone: 'Please enter your phone number',
        address: 'Please enter your address',
        city: 'Please enter your city',
        zip: 'Please enter your zip code',
        country: 'Please enter your country',
        nameOnCard: 'Please enter name on card',
        cardNumber: 'Please enter card number',
        expiry: 'Please enter card expiry date',
        cvv: 'Please enter card CVV'
    },
    submitHandler: function(form) {
        // Display a confirmation message before submitting
        if (confirm("Do you want to submit the form?")) {
            form.submit();
        }
    }
});

