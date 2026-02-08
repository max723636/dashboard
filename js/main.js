// main.js

// Function to display current date and time
function displayDateTime() {
    const now = new Date();
    const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
    console.log(`Current Date and Time (UTC): ${formattedDateTime}`);
}

// Event listener for button click
const button = document.getElementById('datetimeButton');
if (button) {
    button.addEventListener('click', displayDateTime);
}

// Initial call to display the date and time when the script loads
displayDateTime();