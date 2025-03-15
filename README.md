# SociPoP

**Social Media Web App**

SociPoP is a full-featured social media web application built with Node.js, Express, and MongoDB. It provides real-time interactions via Socket.io, user authentication with Passport (including Google OAuth), and robust asset management with Gulp.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contact](#contact)

---

## Features

- **User Authentication:** Secure login and registration using Passport (local and Google OAuth).
- **Real-Time Communication:** Integrated Socket.io for live updates and interactions.
- **Media Uploads:** Supports profile pictures and media uploads with Multer.
- **Email Notifications:** Automated email services using Nodemailer.
- **Asset Management:** Uses Gulp for tasks such as SASS compilation, CSS minification, and image optimization.
- **Session Management:** Sessions stored in MongoDB for persistence using connect-mongo and connect-mongodb-session.

---

## Technology Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templating, CSS/SCSS
- **Database:** MongoDB with Mongoose
- **Real-Time:** Socket.io
- **Authentication:** Passport (Local & Google OAuth)
- **Task Runner:** Gulp
- **Others:** Cookie-parser, Morgan, JSON Web Tokens, and more

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or remote instance)
- npm (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sakilmostak/SociPoP.git
   cd SociPoP
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

Create a .env file in the root directory and define the necessary configuration variables. For example:
  ```bash
      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/sociPOP
      SESSION_SECRET=your_session_secret
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      Run the application:
  ```

4. **For development:**
  
    ```bash
    npm start
    ```
    
---

## Configuration

- **Database:** Update your MongoDB URI in the .env file.
- **Authentication:** Configure Passport strategies in the config and controllers folders. Ensure your OAuth credentials are correctly set.
- **Assets:** Modify your Gulp tasks (in gulpfile.js) to suit your asset compilation and optimization needs.

---

## Usage

Once the application is running, open your browser and navigate to:
  ```bash
  http://localhost:3000
  ```
You should see the home page of the SociPoP web app. Use the available routes for registration, login, posting updates, and more.

---

## Contact
Developed by [**Sakil Mostak**](https://github.com/Sakilmostak)

Feel free to reach out via [GitHub Issues](https://github.com/Sakilmostak/SociPoP/issues) for any questions or feedback.
