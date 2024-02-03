document.addEventListener("DOMContentLoaded", function() {
    const otpInputs = document.querySelectorAll('.otp-container input[type="text"]');
    const form = document.getElementById('paypotpform');

    // Function to move focus to next input
    function moveToNextInput(element) {
        const nextInput = element.nextElementSibling;
        if (nextInput && nextInput.tagName === "INPUT") {
            nextInput.focus();
        }
    }

    // Function to check if all inputs are filled
    function checkIfAllFilled() {
        const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
        if (allFilled) {
            form.submit();
        }
    }

    // Event listener for each OTP input
    otpInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Allow only numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            // Move to next field if this one is filled
            if (this.value.length === 1) {
                moveToNextInput(this);
            }
            // Check if all fields are filled
            checkIfAllFilled();
        });
    });

    
    // Assuming you have a way to get the OTP, you would call a function like this:
    // This is just an example and would need to be implemented according to your actual logic
    function autofillOtp(otp) {
        if(otp.length === 6) {
            otp.split('').forEach((num, index) => {
                otpInputs[index].value = num;
            });
            checkIfAllFilled();
        }
    }

    // Example usage:
    // autofillOtp('123456'); // This should be replaced with the actual OTP value you receive
});
