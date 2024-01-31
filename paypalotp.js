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

    // Event listener to prevent default form submission and to stop Netlify confirmation
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Combine the values from each input
        const otpValue = Array.from(otpInputs).map(input => input.value).join('');

        // Perform the fetch or ajax call to submit the form data here
        // This is where you would integrate with your backend to handle the OTP verification
        // Since we cannot actually implement a real OTP verification without a backend, this is just a placeholder
        console.log('Form submitted with OTP:', otpValue);

        // You can uncomment the fetch call and implement it according to your API
        /*
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
            return response.text();
        })
        .then(data => {
            // Handle success - perhaps redirecting to another page or showing a success message
            console.log(data);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error);
        });
        */
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
