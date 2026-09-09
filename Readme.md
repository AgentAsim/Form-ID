# E-Shopmine
E-Shopmine is a privacy focus transcations manager system web app. That allow their user's to monitor their CSE shop accounts easily.
Give it a try:
Username: dummy
Password: dummy

## Project Structure
```bash
E-Shopmine
├── backend
│   ├── app
│   │   ├── app.py
│   │   ├── auth.py
│   │   ├── databases
│   │   │   ├── crud.py
│   │   │   ├── __init__.py
│   │   │   ├── mongo.py
│   │   │   └── __pycache__
│   │   │       ├── crud.cpython-314.pyc
│   │   │       ├── __init__.cpython-314.pyc
│   │   │       └── mongo.cpython-314.pyc
│   │   ├── func
│   │   │   ├── func.py
│   │   │   ├── __init__.py
│   │   │   └── __pycache__
│   │   │       ├── func.cpython-314.pyc
│   │   │       └── __init__.cpython-314.pyc
│   │   ├── __init__.py
│   │   ├── model
│   │   │   ├── __init__.py
│   │   │   ├── model.py
│   │   │   └── __pycache__
│   │   │       ├── __init__.cpython-314.pyc
│   │   │       └── model.cpython-314.pyc
│   │   ├── __pycache__
│   │   │   ├── app.cpython-314.pyc
│   │   │   ├── auth.cpython-314.pyc
│   │   │   └── __init__.cpython-314.pyc
│   │   ├── schema
│   │   │   ├── __init__.py
│   │   │   ├── __pycache__
│   │   │   │   ├── __init__.cpython-314.pyc
│   │   │   │   └── schema.cpython-314.pyc
│   │   │   └── schema.py
│   │   └── Search
│   │       └── __pycache__
│   │           ├── __init__.cpython-314.pyc
│   │           └── search.cpython-314.pyc
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── __init__.py
│   ├── main.py
│   ├── __pycache__
│   │   ├── __init__.cpython-314.pyc
│   │   └── main.cpython-314.pyc
│   └── requirements.txt
├── Frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── netlify.toml
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Home.jsx
│   │   │   ├── LogForm.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Nav.jsx
│   │   │   └── Notification.jsx
│   │   ├── Context
│   │   │   └── context.js
│   │   ├── Main.css
│   │   ├── main.jsx
│   │   └── style
│   │       ├── color-theme.css
│   │       ├── form.css
│   │       ├── home.css
│   │       ├── login.css
│   │       ├── modal.css
│   │       ├── nav.css
│   │       └── notification.css
│   └── vite.config.js
└── Readme.md

```
## Requirements
- MongoDB - for the data storage.
- Docker - for running the server continuously.

## Prerequisites
#### Replace Value key word with your desire values (e.g. IP Address, Expiraction Time, Global Web URL, etc.)

- Place one .env file on backend folder with these variables values
    - Create a MariaDB account for enable docker intigration with the server with replace host with your IP Address.
    - Create a Secret key for JWT Token Validation.
    - Set Token Expiration Time in Minutes.

```bash
# Authentication Secrets
SECRET_KEY=values
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=values

# Server Configurations
SERVER_PORT=8000
SERVER_HOST=0.0.0.0
SERVER_RELOAD=True

# MongoDB Database Configurations
Mongo_DB_USER=values
Mongo_DB_PASS=values
Mongo_DB_HOST=values
Mongo_DB_DEBUG=False

# frontend server connection
self_connect=http://localhost:5173
local_connect=http://values:5173
global_connect=values
```
- Place Another one in Frontend Folder
```bash
# Backend API
VITE_API=http://localhost:8000
```

## Installation
```bash
git clone https://github.com/SchutzAsim/E-Shopmine.git

cd E-Shopmine
```

### Start Python Server
```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python main.py
```

### Start Node.js Server
```bash
cd Frontend

npm i

npm run dev
```

## License

🚧 **License Adding Soon** 🚧

This project will be open-sourced under a permissive license soon.
You are free to use this repo for learning & personal use.
For any query, please connect on [asimsaifioffical12@gmail.com] for permissions.
