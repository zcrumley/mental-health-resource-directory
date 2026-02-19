# **Mental Health Resource Directory**

Full-stack mobile resource directory built with React Native (Expo Router) and Django REST Framework.
This project demonstrates end-to-end architecture, REST API integration, structured data management, and portable local development workflows.

## **Overview**  
  
The application allows users to:

- Browse categorized community resources
- View detailed resource information
- Consume data from a RESTful Django API
- Run the full stack locally
  
The backend serves structured resource data while the mobile frontend renders category-based listings.

### **Tech Stack:**

#### **Frontend:**
  React Native,
  Expo Router,
  JavaScript,
  
#### **Backend:**
  Python,
  Django,
  Django REST Framework,
  SQLite (development)

**Local Setup**

**Backend:**

- cd backend
- python -m venv .venv
- .\.venv\Scripts\activate   # PowerShell: Activate.ps1
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py loaddata resources_fixture.json
- python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/api/resources/

**Frontend**

- cd frontend
- npm install
- npx expo start

Run on Android emulator or web.

## **Notes**

- Development prototype (not production-ready)
- SQLite used for local development
- Database file is not version-controlled
- Seed data managed via JSON fixture

## **Purpose**

This project highlights:

- Full-stack architecture
- REST API design and consumption
- Data seeding and environment portability
- Multi-machine Git workflow
