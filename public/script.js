// JavaScript for the timer
let timerSeconds = 60;
const timerElement = document.getElementById('timer');
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds--;
        timerElement.textContent = timerSeconds;

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('resendLink').style.display = 'inline'; // Show the "Resend Email" link
            document.getElementById('resendLink').addEventListener('click', resendEmail);
            timerElement.textContent = 'Expired';
        }
    }, 1000);
}

function resendEmail() {
    // Add your logic here to resend the email
    // For demonstration purposes, we'll reset the timer and hide the link
    timerSeconds = 60;
    timerElement.textContent = timerSeconds;
    document.getElementById('resendLink').style.display = 'none'; // Hide the "Resend Email" link
    startTimer(); // Restart the timer
    document.getElementById('resendLink').removeEventListener('click', resendEmail);
}

// Start the timer when the page loads
startTimer();
