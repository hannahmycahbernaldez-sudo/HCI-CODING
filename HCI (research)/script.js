// ================= SIGN UP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Account created successfully!");

        window.location.href = "index.html"; // go to login
    });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("loggedIn", "true");

            alert("Login successful!");
            window.location.href = "request.html"; // proceed here
        } else {
            alert("Invalid email or password!");
        }
    });
}

// ================= PROTECT REQUEST PAGE =================
if (window.location.pathname.includes("request.html")) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "index.html";
    }
}

// ================= REQUEST FORM =================
const requestForm = document.getElementById("requestForm");

if (requestForm) {
    requestForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const paymentMethod = document.getElementById("paymentMethod").value;

        // ✅ CHECK PAYMENT
        let isPaid = false;

        if (paymentMethod === "GCash" || paymentMethod === "Credit Card") {
            isPaid = true;
            alert("Payment confirmed via " + paymentMethod + "!");
        }

        const data = {
            name: document.getElementById("name").value,
            studentId: document.getElementById("studentId").value,
            course: document.getElementById("course").value,
            requestType: document.getElementById("requestType").value,
            purpose: document.getElementById("purpose").value,
            paymentMethod: paymentMethod,
            contactNumber: document.getElementById("contactNumber").value,
            paid: isPaid // ✅ IMPORTANT
        };

        localStorage.setItem("requestData", JSON.stringify(data));

        window.location.href = "confirmation.html";
    });
}
const form = document.getElementById("requestForm");

form.addEventListener("submit", function(e) {
    const contactNumber = document.getElementById("contactNumber").value.trim();

    // check if empty
    if (contactNumber === "") {
        e.preventDefault();
        alert("Please enter your contact/reference number!");
        return;
    }

    // check if may letters
    if (!/^[0-9]+$/.test(contactNumber)) {
        e.preventDefault();
        alert("Numbers only! Letters are not allowed.");
    }
});
// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
