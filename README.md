## 🏡 BasaFinder Backend – Smart Rental & Housing Solution

This is the backend of BasaFinder, a full-stack rental housing platform. It powers the user roles, authentication, request handling, payments, and data management via RESTful APIs.

> Live API Coming Soon...

### ⚙️ Core Features

- 🧪 **Authentication:** JWT & bcrypt
- 📁 **RESTful API Endpoints** for landlords, tenants, and admins
- 📊 **Role-Based Request Management**
- 💸 **Payment Integration:** ShurjoPay
- 📨 **Notifications** for landlords, tenants, and admins
- 🧠 **Built with Express.js + Mongoose**

### 📂 Project Structure

- `/service` - Business logic
- `/controllers` - Handles route logic
- `/routes` - API route definitions
- `/models` - Mongoose schemas
- `/middlewares` - JWT & error handling
- `/utils` - Helper functions


### 🔐 Environment Variables

```env
DB_URL=your db url
BCRYPT_SALT_ROUNDS=''
EMAIL_USER=your-mailtrap-username
EMAIL_PASSWORD=your-mailtrap-password
JWT_ACCESS_SECRET=your access secret
JWT_ACCESS_EXPIRES_IN=your access time
JWT_REFRESH_SECRET=your refresh secret
JWT_REFRESH_EXPIRES_IN=1y
CLOUDINARY_CLOUD_NAME=your clodi name
CLOUDINARY_API_KEY=clodi api key
CLOUDINARY_API_SECRET=clodi api secret
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=your return url


#### 6. **API Endpoint Table**
Use a clean table format if possible:
```md
| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/auth/register`    | Register landlord/tenant        |
| POST   | `/api/auth/login`       | Login and get JWT               |
| GET    | `/api/users`            | Admin: view all users           |
| POST   | `/api/listings`         | Landlord: add listing           |
| PUT    | `/api/requests/:id/approve` | Approve rental request     |
| POST   | `/api/payments`         | Handle payment processing       |

---

📧 **About the Developer**  
Md Ashiqur Rahman — Mearn Stack Developer
📩 web3.0.ashiq@gmail.com | 📱 +8801727504474
