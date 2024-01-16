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

// New function to handle promotional offer claim
function handlePromoClaim(event) {
    event.preventDefault(); // Prevent the default form submission
    const promoForm = event.target;

    // Disable input fields and button
    promoForm.querySelectorAll('select, button[type="submit"]').forEach(element => {
        element.disabled = true;
    });

    // Change button text and style
    const claimButton = promoForm.querySelector('button[type="submit"]');
    claimButton.textContent = 'Offer Claimed';
    claimButton.classList.add('btn-success');
    claimButton.classList.remove('btn-primary');

    // Add a visual cue that the offer has been claimed
    const promoPriceSection = document.querySelector('.promo-price');
    promoPriceSection.innerHTML += '<div class="confirmation">Offer Claimed!</div>';
    promoPriceSection.querySelector('.current-price').classList.add('price-claimed');

    // Update the Order Summary to reflect the BOGO offer
    const orderSummary = document.querySelector('.order-summary');
    orderSummary.innerHTML += '<p class="offer-claimed">Bonus Item: <span class="float-right">FREE</span></p>';
}

// Set default value for country field and attach event listeners
document.addEventListener("DOMContentLoaded", function() {
    const countryInput = document.getElementById('country');
    if (countryInput) {
        countryInput.value = shippingInfo.country;
    }

    // Event listeners for input fields
    const inputFields = ['fullName', 'email', 'phone', 'address', 'city', 'zip', 'country', 'nameOnCard', 'cardNumber', 'expiry', 'cvv'];
    inputFields.forEach((field) => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', (event) => {
                if (field === 'cardNumber') {
                    validateCardNumber(element);
                } else if (field === 'expiry') {
                    validateExpiry(element);
                } else if (field === 'cvv') {
                    validateCVV(element);
                } else {
                    handleInputChange(event, field);
                }
            });
        }
    });

    // Event listener for the shipping method radio buttons
    ['standardShipping', 'priorityShipping'].forEach((id) => {
        const radioButton = document.getElementById(id);
        if (radioButton) {
            radioButton.addEventListener('change', (event) => {
                shippingInfo.shippingMethod = event.target.value;
            });
        }
    });

    // Attach event listener to the promo form submit event
    const promoForm = document.getElementById('promo-form');
    if (promoForm) {
        promoForm.addEventListener('submit', handlePromoClaim);
    }

    // Logic for handling the checkout form submission
    const checkoutForm = document.getElementById('checkout-formal');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            // Implement checkout form submission logic here
            // This might involve validating the input data, sending it to your server, etc.
        });
    }
});
