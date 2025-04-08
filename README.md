# 🛍️ Bun Amazon Scraper

A fullstack web application that allows searching for products on Amazon and displaying the results in a clear, responsive, and styled manner. The backend is built with Bun, responsible for scraping the data, while the frontend uses Vite

## ⚙️ Prerequisites

Before following the instructions in this documentation, make sure you have Bun installed on your system. [Bun](https://bun.sh/) is a fast JavaScript runtime that you’ll need to run the backend of this project.

To install Bun, you can use the following commands:

Linux & macOS:
```bash
curl -fsSL https://bun.sh/install | bash
```

Windows:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

## ⚙️ Technologies

- **Frontend:** Vite, HTML, CSS and JavaScript
- **Backend:** Bun, Express.js, Axios and JSDOM
- **Styling:** Pure CSS with responsiveness

## Project's Structure

```plaintext
bun-amazon-scraper/
├── backend/
│   ├── server.js  # Contains the app server, used to run the backend.
│   ├── scraper.js  # Contains the scraping logic.
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── ...
│   └── src/
│       ├── main.js  # Contains the logic to send requests to backend and manipulate DOM accordingly.
│       ├── mock.json  # Contains the mock data used in case connection fails.
│       └── ...
│
└── README.md
```

## 🚀 How to Install and Run

### Backend (Bun)

1. Navigate to backend folder:
```bash
cd backend
```
2. Install backend's dependencies:
```bash
bun install
```
3. Run backend:
```bash
bun run start
```

### Frontend (Vite)

1. Navigate to frontend folder:
```bash
cd frontend
```
2. Install frontend's dependencies:
```bash
bun install
```
3. Run frontend:
```bash
bun run dev
```

## 🧪 How to Use
1. Enter a product name in the search field.
2. Click the "Search" button.
3. The application will display:
    - A loader during loading
    - Cards with the found products containing:
        - Image
        - Title (limited to 4 lines)
        - Formatted price
        - Rating and number of reviews

## ⚠️ Note

Sometimes, Amazon may block requests. In such cases, a message will be displayed on the screen, and a mock result will be shown as an example.
