# 🛍️ E-Commerce Store

This is a full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce web application. It allows users to browse products, add them to a cart, and place orders. The app features user authentication, product management, and secure payment integration.

Check out the live version: [E-Commerce Store](https://e-commerce-store-c5pq.onrender.com/)

## 🚀 Features

- User authentication (Login/Signup)
- Browse products by categories
- Add products to the cart
- Place orders and process payments
- User profile for managing orders
- Responsive design for all devices
- Admin dashboard to manage products and orders

## 💻 Tech Stack

- **Frontend**: React, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Payment Gateway**: Stripe API

## 📦 Dependencies

### Backend:
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for authenticating users with JWT
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Stripe](https://www.npmjs.com/package/stripe) - Payment gateway integration
- [cors](https://www.npmjs.com/package/cors) - Middleware to enable Cross-Origin Resource Sharing
- [dotenv](https://www.npmjs.com/package/dotenv) - To manage environment variables
- [nodemon](https://www.npmjs.com/package/nodemon) - For automatically restarting the server when code changes

### Frontend:
- [React](https://reactjs.org/) - Frontend JavaScript library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
- [React-Stripe](https://www.npmjs.com/package/@stripe/react-stripe-js) - For integrating Stripe in React
- [react-hot-toast](https://react-hot-toast.com/) - For notifications and toasts
- [Lucide-Icons](https://lucide.dev/) - For Icons

## 🛠️ Installation and Setup

### Prerequisites:
- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Stripe API Key](https://stripe.com/docs/keys)

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhishek-Devanda/E-Commerce-Store.git
   cd ecommerce-store```
   ```
2. **Install backend dependencies**:
   ```bash
   npm install
   ```
3. Set up environment variables: Create a ```.env``` file in the ```backend``` folder and add the following:
   ```makefile
   PORT= your_desired_port
   NODE_ENV = development
   MONGO_URI=your_mongodb_uri
   CLIENT_URL = 
   REFRESH_TOKEN_SECRET=your_secret_key
   ACCESS_TOKEN_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME =your_cloudninary_cloud_name
   CLOUDINARY_API_KEY =your_cloudninary_api_key
   CLOUDINARY_API_SECRET =your_cloudninary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
7. Start the frontend server:
   ```bash
   npm run dev
   ```
## 👏 Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.
