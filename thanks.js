window.onload = function() {
    setTimeout(function() {
        document.querySelector('.spinner-container').style.display = 'none';
        document.querySelector('.otp-container').style.display = 'flex';
    }, 3000);

    // Listen to input events on OTP fields
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (index === otpInputs.length - 1 && input.value) {
                submitOTP();
            }
        });
    });
};

function submitOTP() {
    // Here you can add logic to validate the OTP if needed
    // For this example, I'm directly showing the thank-you screen.

    document.querySelector('.otp-container').style.display = 'none';
    document.querySelector('.spinner-container').style.display = 'flex';

    setTimeout(function() {
        document.querySelector('.spinner-container').style.display = 'none';
        document.querySelector('.thanks-container').style.display = 'flex';
    }, 3000);
}
