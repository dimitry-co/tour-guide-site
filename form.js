// Form submission handler. Save form data to local storage on submission
document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));

    // Validate first name
    if (!userData.fname) {
        document.getElementById('fname-error').textContent = 'First name is required.';
        isValid = false;
    }

    // Validate last name
    if (!userData.lname) {
        document.getElementById('lname-error').textContent = 'Last name is required.';
        isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!/^\d{10}$/.test(userData.phone)) {
        document.getElementById('phone-error').textContent = 'Phone number must be 10 digits.';
        isValid = false;
    }

    if (!userData.address) {
        document.getElementById('adress-error').textContent = 'Address is required.';
        isValid = false;
    }

    // Stop if validation fails
    if (!isValid) return;

    // Save form data to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registration successful!');

    // redirect to the homepage
    window.location.href = 'index.html';

    // Display confirmation message
    const submittedData = `
        <div class="alert alert-success">
            <h3>You Are Now Registered</h3>
            <p><strong>Name:</strong> ${userData.fname} ${userData.lname}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Address:</strong> ${userData.address}</p>
        </div>
    `;

    document.getElementById('submitted-data').innerHTML = submittedData;
    event.target.style.display = 'none';
});

// Check localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('userData');

    if (savedData) {
        const userData = JSON.parse(savedData);

        // Show confirmation message if data exists
        document.getElementById('submitted-data').innerHTML = `
            <div class="alert alert-info">
                <h3>Welcome Back!</h3>
                <p><strong>Name:</strong> ${userData.fname} ${userData.lname}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Phone:</strong> ${userData.phone}</p>
                <p><strong>Address:</strong> ${userData.address}</p>
            </div>
        `;
        document.getElementById('registration-form').style.display = 'none';
    }
});

// Reset button handler
document.getElementById('reset-button').addEventListener('click', () => {
    // Clear storage
    localStorage.removeItem('userData');

    // Reset the form fields
    document.getElementById('registration-form').reset();

    // Clear error messages
    document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));

    // Clear the submitted data section
    document.getElementById('submitted-data').innerHTML = '';

    // Show the form again (if it was hidden after submission)
    document.getElementById('registration-form').style.display = 'block';
});


