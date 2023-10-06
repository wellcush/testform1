document.addEventListener("DOMContentLoaded", function() {
    // Initialize DOM elements
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    const btnConfirm = document.querySelector('.btn-2');

    // 1. Show spinner for 15 seconds on page load
    setTimeout(() => {
        spinnerContainer.style.display = 'none';
        otpContainer.style.display = 'flex';
    }, 15000);

    // 3. Auto-navigate to the next input
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length >= 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            // 4. Auto submit if all inputs are filled
            if (Array.from(otpInputs).every(i => i.value.length === 1)) {
                btnConfirm.click();
            }
        });

        // 1. Visual feedback on input
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 5px #666';
        });
        input.addEventListener('blur', () => {
            input.style.boxShadow = '';
        });
    });
otpInputs.forEach((input) => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

    // Event for the Confirm button click
    btnConfirm.addEventListener('click', () => {
        otpContainer.style.display = 'none';
        spinnerContainer.style.display = 'flex';

        // 5. Transition from spinner to thank you after a short duration
        setTimeout(() => {
            spinnerContainer.style.opacity = 0;  // Begin fade-out effect
            setTimeout(() => {
                spinnerContainer.style.display = 'none'; // Hide spinner after fade-out
                thanksContainer.style.display = 'flex';  // Display thank you message
                thanksContainer.style.opacity = 0;   // Prepare for fade-in
                setTimeout(() => {
                    thanksContainer.style.opacity = 1;  // Begin fade-in effect
                }, 50);
            }, 500);  // 500ms duration for fade-out
        }, 3000);  // 3 seconds duration for spinner before transitioning to thank you
    });
});

