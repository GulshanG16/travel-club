/* =========================================================
 Lab 5 - script.js
 DOM Manipulation & Events
========================================================= */

/* Feature 1: DOM Ready
   Wait until the HTML is fully loaded before selecting elements */
document.addEventListener("DOMContentLoaded", () => {

    /* Feature 2: Focus/Blur UX on inputs
       One querySelectorAll call with a combined selector */
    const inputs = document.querySelectorAll("#username, #email, #password");

    inputs.forEach((input) => {
        input.addEventListener("focus", () => {
            input.style.backgroundColor = "#fffae0";
        });

        input.addEventListener("blur", () => {
            input.style.backgroundColor = "white";
        });
    });

    /* Feature 3: Form validation on submit */
    const form = document.getElementById("signup-form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");

    // Show an error beside a field
    function showError(field, spanId, message) {
        const span = document.getElementById(spanId);
        span.textContent = message;
        span.style.display = "block";
        field.classList.add("error-border");
    }

    // Clear an error when the field is valid
    function clearError(field, spanId) {
        const span = document.getElementById(spanId);
        span.textContent = "";
        span.style.display = "none";
        field.classList.remove("error-border");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // stop the page from reloading

        let isValid = true;

        // Username: required (not empty after trimming)
        if (username.value.trim() === "") {
            showError(username, "error-username", "Username is required");
            isValid = false;
        } else {
            clearError(username, "error-username");
        }

        // Email: required + must look like an email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "error-email", "Enter a valid email address");
            isValid = false;
        } else {
            clearError(email, "error-email");
        }

        // Password: at least 8 characters
        if (password.value.length < 8) {
            showError(password, "error-password", "Password must be at least 8 characters");
            isValid = false;
        } else {
            clearError(password, "error-password");
        }

        // Terms: must be checked
        if (!terms.checked) {
            showError(terms, "error-terms", "You must accept the terms");
            isValid = false;
        } else {
            clearError(terms, "error-terms");
        }

        // Success only when everything is valid
        if (isValid) {
            alert("Welcome to the Travel Photo Club! Your registration was successful.");
            form.reset();
        }
    });

    /* Feature 4: Gallery interaction */
    const thumbs = document.querySelectorAll(".thumb");
    const caption = document.getElementById("image-caption");

    // Expand only the selected tile and update the caption
    function selectThumb(thumb) {
        thumbs.forEach((t) => {
            t.classList.remove("expanded");
        });
        thumb.classList.add("expanded");
        caption.textContent = `This shot is from ${thumb.dataset.city}`;
    }

    thumbs.forEach((thumb) => {
        // Click support
        thumb.addEventListener("click", () => {
            selectThumb(thumb);
        });

        // Keyboard support: Enter key
        thumb.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                selectThumb(thumb);
            }
        });
    });
});