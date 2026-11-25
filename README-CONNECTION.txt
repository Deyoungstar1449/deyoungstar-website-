DE YOUNG STARS — CONNECTED FRONTEND PACKAGE

This package connects the public website and admin dashboard to the separate backend Worker.

Frontend:
https://de-young-stars-home-of-restoration-evangelical-outreach.deyoungstarhomeofrestoration.workers.dev

Backend API:
https://de-young-stars-backend.deyoungstarhomeofrestoration.workers.dev

FILES / STRUCTURE
- index.html
- admin.html
- styles.css
- script.js
- logo.png

IMPORTANT DEPLOYMENT
1. Upload the CONTENTS of this folder to the existing frontend Cloudflare Worker/Pages static-assets deployment.
2. Keep the assets folder and logo.png in that exact folder structure.
3. Do not upload this ZIP file itself as the website.
4. The admin dashboard is at: https://de-young-stars-home-of-restoration-evangelical-outreach.deyoungstarhomeofrestoration.workers.dev/admin.html

BACKEND CONNECTION REQUIREMENT
The frontend now sends API requests to the backend URL above and uses credentials: include for admin-session cookies.
The backend must allow this exact frontend origin in its CORS policy:
https://de-young-stars-home-of-restoration-evangelical-outreach.deyoungstarhomeofrestoration.workers.dev

For cookie-based sign-in across the two Worker hostnames, the backend session cookie must be compatible with cross-origin fetch requests (Secure; SameSite=None, with the appropriate cookie domain/host behavior), and the backend CORS response must allow credentials and return the exact frontend origin (not '*').
Do not change or expose your private setup token in frontend files.

This package changes only the frontend files; it does not modify the backend Worker or its database.
