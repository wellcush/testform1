document.addEventListener("DOMContentLoaded", function() {
    // Simulate a 3 second delay before showing the OTP form
    setTimeout(function() {
        hideElement('.spinner-container');
        showElement('.otp-container');
    }, 3000);

    // Attach input event listeners to the OTP inputs
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (index === otpInputs.length - 1 && input.value) {
                submitOTP();
            }
        });
    });
});

function submitOTP() {
    hideElement('.otp-container');
    showElement('.spinner-container');
    
    // Simulate a 3 second delay for OTP verification
    // In a real-world scenario, this is where you'd call your backend to verify the OTP
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
