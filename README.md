# 🏡 BasaFinder Backend – Smart Rental & Housing Solution
## 🌐 Base API URL https://basefinder-server.onrender.com/api/vi
Or locally: http://localhost:5000/api/v1
🔗 **Live serverdd. :** [https://basefinder-server.onrender.com](https://basefinder-server.onrender.com)

The backend for **BasaFinder**, a full-featured smart rental housing solution. Built with **Node.js**, **Express**, and **MongoDB**, it supports multiple user roles (Admin, Landlord, Tenant), rental house listings, requests, payments, and notifications.

---

## 🚀 Features

- Role-based authentication and authorization (JWT)
- Rental house listing and management (Landlords)
- Request system (Tenants to Landlords)
- Online payment processing and verification
- Role-based notification system
- User profile and admin management
- Category creation with file upload (icons)

---

## 📁 Folder Structure (Key Modules)

src/ ├── modules/ │ ├── auth/ # Auth routes & controllers │ ├── user/ # User management │ ├── rentalHouses/ # House listings │ ├── rentalRequest/ # Tenant to landlord requests │ ├── rentPayment/ # Payment processing │ ├── category/ # House categories │ └── notification/ # Notification system ├── middleware/ # Custom auth, validation, parser ├── config/ # Multer, database config, etc.


---

## 📡 API Endpoints

### ✅ Auth

| Method | Endpoint               | Roles                       | Description                |
|--------|------------------------|-----------------------------|----------------------------|
| POST   | `/api/auth/login`      | Public                      | Log in a user              |
| POST   | `/api/auth/refresh-token` | Public                  | Refresh JWT token          |
| POST   | `/api/auth/change-password` | Admin, Landlord, Tenant | Change password            |
| POST   | `/api/auth/reset-password`  | Public                  | Request password reset     |

---

### 👤 Users

| Method | Endpoint                   | Roles                     | Description                        |
|--------|----------------------------|---------------------------|------------------------------------|
| POST   | `/api/user/register`       | Public                    | Register a new user                |
| GET    | `/api/user/my-profile`     | All Roles                 | Get logged-in user profile         |
| POST   | `/api/user/update-profile` | All Roles                 | Update user profile                |
| GET    | `/api/user/allusers`       | Admin                     | Get all users                      |
| GET    | `/api/user/:id`            | All Roles                 | Get user by ID                     |
| PATCH  | `/api/user/status/:userId` | Admin                     | Update user's status               |
| DELETE | `/api/user/:id`            | Admin                     | Delete a user                      |

---

### 🏠 Rental Houses

| Method | Endpoint                         | Roles       | Description                         |
|--------|----------------------------------|-------------|-------------------------------------|
| POST   | `/api/rental-house/landlords/listings` | Landlord | Create house with image upload      |
| GET    | `/api/rental-house/landlords/listings` | Public   | Get all listings                    |
| GET    | `/api/rental-house/landlords/listings/:id` | Public | Get listing by ID                   |
| PATCH  | `/api/rental-house/landlords/listings/:houseId` | Landlord, Admin | Update house        |
| DELETE | `/api/rental-house/landlords/listings/:id` | Landlord, Admin | Delete house        |
| GET    | `/api/rental-house/listings`     | Landlord, Admin | Get listings by logged-in user     |

---

### 📨 Rental Requests

| Method | Endpoint                          | Roles       | Description                          |
|--------|-----------------------------------|-------------|--------------------------------------|
| POST   | `/api/rental-request/`            | Tenant      | Send rental request                  |
| GET    | `/api/rental-request/tenant`      | Tenant      | View tenant's requests               |
| GET    | `/api/rental-request/landlord`    | Landlord    | View requests for landlord’s listings|
| PATCH  | `/api/rental-request/status/:requestId` | Landlord | Update request status (approve/deny) |
| GET    | `/api/rental-request/:listingId`  | Tenant      | Get request by listing ID            |
| GET    | `/api/rental-request/:id`         | All Roles   | Get request by ID                    |
| DELETE | `/api/rental-request/:id`         | Admin       | Delete a request                     |
| PATCH  | `/api/rental-request/:id`         | Admin       | Update a request                     |
| GET

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/basafinder-server.git
cd basafinder-server

npm install

.env
PORT=5000

NODE_ENV='development'


DB_URL=""
BCRYPT_SALT_ROUNDS=12
EMAIL_USER=your-mailtrap-username
EMAIL_PASSWORD=your-mailtrap-password
JWT_ACCESS_SECRET=""
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=""
JWT_REFRESH_EXPIRES_IN=1y

JWT_PASS_RESET_SECRET=password secrek key
JWT_PASS_RESET_EXPIRES_IN=15m
CLOUDINARY_CLOUD_NAME=''
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=your payment verify return url

npm run dev
Server will run on http://localhost:5000/api/v1


🧪 Technologies Used
Node.js + Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

Multer (for image upload)

SSLCOMMERZ (payment gateway)

Role-Based Access Middleware


👨‍💻 Author
Md Ashiqur Rahman
Mern Stack Developer
📧 web3.0.ashiq@gmail.com
🌐 Portfolio | 💼 LinkedIn