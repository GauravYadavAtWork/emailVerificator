import express from "express"
import bodyParser from "body-parser"
import session from "express-session";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: 'your_secret_key', // Change this to a strong, unique secret key
        resave: false,
        saveUninitialized: false,
    })
);
app.set('view engine', 'ejs');

// Nodemailer configuration (replace with your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
        user: process.env.EMAILID,
        pass: process.env.PASSWORD,
    },
});

// Store generated random numbers and email addresses for verification
const emailVerificationTokens = new Map();

// Serve an HTML form for email submission
app.get('/', (req, res) => {
    res.render("form.ejs");
});

// Handle email submission and send a verification email with a random number
var verificationtoken;
app.post('/register', (req, res) => {
    const email = req.body.email;
    const customMessage = req.body.customMessage;
    req.session.email = email;
    req.session.customMessage = customMessage;

    // Generate a 6-digit random verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    verificationtoken = verificationToken;

    // Store the random number with the associated email address
    emailVerificationTokens.set(email, verificationToken);

    // Send the verification email
    const mailOptions = {
        from: process.env.EMAILID,
        to: email,
        subject: 'Welcome to AlumNet - Email Verification',
        html: `
            <html>
            <head>
                <style>
                    /* Add your custom styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-collapse: collapse;
                    }
                    .header {
                        padding: 20px 0;
                        text-align: center;
                        background-color: #007BFF;
                        color: #ffffff;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        padding: 10px 0;
                        text-align: center;
                        background-color: #007BFF;
                        color: #ffffff;
                    }
                    h1 {
                        font-size: 24px;
                        margin: 0;
                    }
                    h2 {
                        font-size: 18px;
                        margin: 0;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 20px 0;
                    }
                    a {
                        color: #007BFF;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <table class="container" role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <h1>AlumNet</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2>Welcome to AlumNet</h2>
                            <p>Thank you for registering with AlumNet. To complete your registration, please verify your email by entering the code below:</p>
                            <p>Your Verification Code: <strong style="color: #007BFF;">${verificationToken}</strong></p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p>&copy; ${new Date().getFullYear()} AlumNet. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    };

    // Send the email with the customized content
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.redirect("/hehe");
            res.status(500);

        } else {
            console.log('Email sent:', info.response);
            res.render("OTP.ejs", {
                expectedOTP: verificationtoken
            });
        }
    });
});
app.get('/hehe', (req, res) => {
    const email = req.session.email;
    const customMessage = req.session.customMessage;

    // Generate a 6-digit random verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    verificationtoken = verificationToken;

    // Store the random number with the associated email address
    emailVerificationTokens.set(email, verificationToken);

    // Send the verification email
    const mailOptions = {
        from: process.env.EMAILID,
        to: email,
        subject: 'Welcome to AlumNet - Email Verification',
        html: `
            <html>
            <head>
                <style>
                    /* Add your custom styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-collapse: collapse;
                    }
                    .header {
                        padding: 20px 0;
                        text-align: center;
                        background-color: #007BFF;
                        color: #ffffff;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        padding: 20px 0;
                        text-align: center;
                        background-color: #007BFF;
                        color: #ffffff;
                    }
                    h1 {
                        font-size: 24px;
                        margin: 0;
                    }
                    h2 {
                        font-size: 18px;
                        margin: 0;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 20px 0;
                    }
                    a {
                        color: #007BFF;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <table class="container" role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <h1>AlumNet</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2>Welcome to AlumNet</h2>
                            <p>Thank you for registering with AlumNet. To complete your registration, please verify your email by entering the code below:</p>
                            <p>Your Verification Code: <strong style="color: #007BFF;">${verificationToken}</strong></p>
                            <p>Click the following link to verify your email: <a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a></p>
                            <p>Your Custom Message: <strong style="color: #007BFF;">${customMessage}</strong></p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p>&copy; ${new Date().getFullYear()} AlumNet. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    };

    // Send the email with the customized content
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.redirect("/hehe");
        } else {
            console.log('Email sent:', info.response);
            res.render("OTP.ejs", {
                expectedOTP: verificationtoken
            });
        }
    });
});



app.get("/authCheck", (req, res) => {
    const email = Array.from(emailVerificationTokens.keys()).find(
        (key) => emailVerificationTokens.get(key) === parseInt(verificationtoken)
    );
    if (email) {
        // Remove the email and token from the map to prevent reuse
        emailVerificationTokens.delete(email);
        res.render("main.ejs");
    } else {
        res.send('Invalid verification token or token expired. Email not verified.');
    }
});
// Handle email verification
app.get('/verify/:token', (req, res) => {
    const verificationToken = req.params.token;
    // Retrieve the associated email address for this token
    const email = Array.from(emailVerificationTokens.keys()).find(
        (key) => emailVerificationTokens.get(key) === parseInt(verificationToken)
    );
    if (email) {
        // Remove the email and token from the map to prevent reuse
        emailVerificationTokens.delete(email);
        res.render("main.ejs");
    } else {
        res.send('Invalid verification token or token expired. Email not verified.');
    }
});

// app.get('/sendMailtoMany', (req, res) => {
//     const email = req.session.email;
//     // Send the verification email
//     const mailOptions = {
//         from: process.env.EMAILID,
//         to: ["aaa684617@gmail.com", "dopalundbc@gmail.com", "2k22.csaiml.2211150@gmail.com", "ishaansahu210@gmail.com", "gauravyatwork@gmail.com"],
//         subject: 'Welcome to AlumNet - Email Verification',
//         text: "mass email test",
//     };

//     // Send the email with the customized content
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             res.send("error sending mail");
//         } else {
//             console.log('Email sent:', info.response);
//             res.send("Email send to all");
//         }
//     });
// });


// Start the server
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});