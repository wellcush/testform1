window.onload = function() {
    displayOTPAfterDelay();

    listenToOTPInputs();
}

function displayOTPAfterDelay() {
    setTimeout(function() {
        hideElement('.spinner-container');
        showElement('.otp-container');
    }, 3000);
}

function listenToOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-inputs input');

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (index === otpInputs.length - 1 && input.value) {
                submitOTP();
            }
        });
    });
}

function submitOTP() {
    hideElement('.otp-container');
    showElement('.spinner-container');

    setTimeout(function() {
        hideElement('.spinner-container');
        showElement('.thanks-container');
    }, 3000);
}

function hideElement(selector) {
    document.querySelector(selector).style.display = 'none';
}

function showElement(selector) {
    document.querySelector(selector).style.display = 'flex';
}
