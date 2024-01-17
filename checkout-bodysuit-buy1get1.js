let shippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'Australia',
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
}

function validateCardNumber(input) {
    let cardNumber = input.value.replace(/\D/g, '').substring(0, 16);
    cardNumber = cardNumber !== '' ? cardNumber.match(/.{1,4}/g).join(' ') : '';
    input.value = cardNumber;
    shippingInfo.cardNumber = cardNumber;
}

function validateExpiry(input) {
    let expiryDate = input.value.replace(/\D/g, '').substring(0, 4);
    expiryDate = expiryDate !== '' ? expiryDate.match(/.{1,2}/g).join('/') : '';
    input.value = expiryDate;
    shippingInfo.expiry = expiryDate;
}

function validateCVV(input) {
    let cvv = input.value.replace(/\D/g, '').substring(0, 4);
    input.value = cvv;
    shippingInfo.cvv = cvv;
}

document.addEventListener("DOMContentLoaded", function() {
    const promoForm = document.getElementById('promo-form');
    const claimButton = document.querySelector('.claim-offer-btn');
    const promoCard = document.querySelector('.promo-card');

    promoForm.addEventListener('submit', function(event) {
        // Change the button and promo card appearance immediately after submission
        claimButton.textContent = 'Claimed!';
        claimButton.disabled = true;
        claimButton.classList.add('claimed');
        promoCard.classList.add('promo-claimed');
    });
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

    document.getElementById('standardShipping').addEventListener('change', function(event) {
        shippingInfo.shippingMethod = event.target.value;
    });

    document.getElementById('priorityShipping').addEventListener('change', function(event) {
        shippingInfo.shippingMethod = event.target.value;
    });

    const countryInput = document.getElementById('country');
    if (countryInput) {
        countryInput.value = 'Australia';
    }
});

