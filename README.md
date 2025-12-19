## 🔹 Backend & Database Implementation

The ElectroMart project was developed using a PHP-based backend with a MySQL database running on XAMPP.

### 🗄 Database
- MySQL database created and managed using phpMyAdmin.
- Structured relational tables for:
  - Users
  - Products
  - Categories
  - Orders
  - Cart Items
- Proper use of primary keys and foreign keys to maintain data integrity.

### ⚙ Backend (PHP)
- PHP used to handle server-side logic and data processing.
- CRUD operations implemented for users and products.
- Secure database connection using `mysqli` / `PDO`.
- User authentication handled via PHP sessions.
- Server-side form validation applied before database interaction.

### 🔐 Security Considerations
- Input validation and sanitization to prevent SQL Injection.
- Passwords stored using hashing techniques.
- Session-based authentication to manage logged-in users.
- Access control implemented for protected pages.

### 🖥 Development Environment
- XAMPP used as the local development server.
- Apache server for handling HTTP requests.
- MySQL for database management.
- phpMyAdmin for database visualization and management.

---

## 🔹 System Workflow

1. User registers and data is stored securely in the MySQL database.
2. User logs in and a PHP session is created.
3. Products are fetched dynamically from the database.
4. Users can add products to the cart and place orders.
5. Order details are stored and linked to the user in the database.
