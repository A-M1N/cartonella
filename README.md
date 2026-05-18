# **Cartonella** 

![Home Page](./screenshots/homePage.webp)

Cartonella is a full-stack e-commerce platform built as portfolio project to demonstrate modern frontend and backend engineering, scalable data modeling, authentication, admin workflows, order management, product discovery, payment integration.
It was designed to feel like a real online shopping experience while also showcasing clean architecture, reusable UI components, state management, and production-minded deployment.

## Live Demo
https://cartonella.vercel.app/

#### Tech Stack  

| Layer          | Technology |
|----------------|------------|
| **Frontend**   | React 19, React Router 7, Redux Toolkit, React Query 5, React Hook Form,React Hot Toast,React Icons,Axios,Zod |
| **Styling**    | CSS Modules, custom UI components |
| **Backend**    | Node.js, Express 5, Prisma ORM, cors, express-rate-limit, google-auth-library |
| **Database**   | PostgreSQL (managed by Supabase) |
| **Storage**    | Supabase Storage (avatars, product images) , Multer for uploads  |
| **Auth**       | JWT, bcrypt, Google OAuth 2.0 |
| **Payments**   | PayPal REST API, mocked Stripe/Skrill/Apple Pay/Google Pay |
| **Tooling**    | Vite, ESLint, Prettier, Helmet, Rate Limiting, Docker |
| **Deployment**    | Render, Vercel, AWS EC2 was tested during deployment attempts|

## Key Features

### 🛍️ Shopping Experience
- **Product catalogue** with **grid & list views**, **advanced filters** (category, price range, rating, colour, in‑stock), sorting, and search.
- **Product detail page** with image slider, colour/size selectors, quantity picker, “Add to Cart” and “Buy Now”.
- **Shopping cart** scoped to each user via Redux + localStorage; quantity controls, order summary.
- **Wishlist** with toggle, user‑scoped persistence, and “Move All to Cart”.
- **Fully responsive** – works flawlessly on mobile, tablet, and desktop.

### 🏷️ Deals & Promotions
- **Deal of the Day** with live countdown timer, discounted price, free shipping/gift badges.
- **Coupon system** – apply percentage, fixed, or free‑shipping coupons at checkout.
- **Hero cards / collections** – featured sections (Gaming, Technology, Fashion) pulled from the database.

### 💳 Checkout & Payments
- **Multi‑step checkout** – shipping form (auto‑filled from saved addresses), payment method selection.
- **Real PayPal Sandbox** integration + **mock processors** for Stripe, Skrill, Apple Pay, Google Pay (demo mode with test card numbers).
- Order confirmation page with status timeline.

### 👤 User Account
- **JWT authentication** (bcrypt) + **Google Sign‑In** (OAuth 2.0 implicit flow).
- **Profile management** – inline editing of name/phone, avatar upload to **Supabase Storage**.
- **Address management** – CRUD with default address; auto‑fills checkout.
- **Order history** with pagination, filtering by status, and detailed order view (including cancellation).

### ⭐ Reviews & Ratings
- **Verified‑purchase reviews** – only users who purchased (and received) the product can write a review.
- Star rating, title, comment; edit/delete own reviews.
- Rating distribution bars and sorting (newest, highest, lowest, most helpful).

### 🧑‍💼 Admin Dashboard
- **Stats overview** – revenue, orders, products, users, latest orders.
- **Product management** – full CRUD with image URLs (Supabase), search, and pagination.
- **Order management** – filter by status, search, update status, view details.
- **User management** – list all users with order/review counts.
- **Daily Deal administration** – create/delete deals with product selection.
- **Admin route protection** – only users with role `ADMIN` can access.

### 🎨 UI / UX
- Smooth **CSS animations**, hover effects, and consistent colour palette.
- **Skeleton loaders**, loading spinners, and empty/error states on every async view.
- **Accessible** – semantic HTML, ARIA labels, keyboard navigation on sliders.
- Breadcrumbs, footer with links, language selector (UI ready).

## 🏗️ Architecture & Data Model Design
  The product catalog is intentionally structured as a 3-level hierarchy to support a realistic shopping experience and flexible navigation.  
 
  - Level 1 — Main Categories  
      - Electronics  
      - Digital Products  
      - Clothing  
  - Level 2 — Subcategories  
      - Electronics → Laptops, Phones, PC, TV, Camera, Smart Watch
      - Digital Products → Video Games, Gift Cards, Software, Subscriptions
      - Clothing → Men’s Clothing, Women’s Clothing, Kids, Shoes, Perfumes
  - Level 3 — Nested Categories / Brands
      - Laptops → Apple, Asus, Dell, HP, Lenovo, MSI
      - Video Games → FIFA, Call of Duty, Arc Raiders, Battlefield 6, Escape From Tarkov
      - Gift Cards → Steam, Riot Cards, Amazon, Apple, Google Play
      - Subscriptions → Spotify, Netflix, Amazon Prime, Discord Nitro
      - Clothing → Suits, Jackets, Hoodies, Dresses, Skirts, Sneakers, Slippers, Runners, and more
  This structure powers both the navigation menu and the product filters.  
  All product images are stored in **Supabase Storage** (migrated from local uploads).

  The backend is built with a clear **controller → service → route** layer and uses **Prisma ORM** for type‑safe database access.

### Authentication and Profile  
- Email/password signup and login  
- Google login  
- Auth persistence with protected routes  
- Profile details management  
- Profile photo upload  
- Address management for checkout and saved delivery locations  
- Order history and order detail pages  

### Reviews  
  - Product reviews with rating, title, and comment  
  - Only verified purchasers can review products  
  - Users can edit or delete their own reviews  
  - Review statistics and rating distribution  
  - Helpful review visibility and moderation-ready structure  

### Admin Panel  
  - Admin dashboard with store statistics  
  - Product management: add, edit, delete  
  - Order management and status updates  
  - User management  
  - Daily deal management  
  - Fully separate admin layout and protected access  

### Payments  
 - **PayPal** – live sandbox integration with order capture and verification
  - Mock payment flows for:  
      - Stripe    
      - Apple Pay   
      - Skrill  
  - Payment status tracking and order confirmation flow  

### Security and Stability  
- **JWT-based authentication middleware (`protect`)**
  - Verifies Bearer token
  - Decodes user identity
  - Attaches sanitized user object to `req.user`
  - Blocks unauthenticated requests

  - **Role-based authorization middleware (`adminOnly`)**
  - Restricts access to admin-only routes
  - Ensures user role is `ADMIN`
  - Returns proper HTTP status codes:
    - `401` Unauthorized
    - `403` Forbidden

  - **User Roles**
    - `USER` — Standard customer access
    - `ADMIN` — Full access to admin dashboard and management APIs

    All admin routes are protected using:
    `protect → adminOnly`
  - **Rate Limiting** – global limiter (200 req/15 min) + stricter auth limiter (10 req/15 min)
  - **JWT**  access token stored in `localStorage`, attached via Axios interceptor
  - **CORS** configured for frontend/backend communication
  - Input validation using Zod  
  - Protected API routes with JWT authentication  
  - Dockerized backend deployment  

### State Management Strategy  
  #### Cartonella separates state by responsibility:  
   #### Redux Toolkit for global client state:  
  - auth      
  - cart     
  - wishlist  
 #### React Query for server state:  
  - products  
  - categories  
  - collections  
  - deals  
  - orders  
  - reviews  
  - addresses  
 #### React Hook Form + Zod for form state and validation
  This keeps the codebase clean, predictable, and scalable. 
 #### Important Custom Hooks  
   ##### The app uses a set of reusable hooks to keep business logic organized:  
  - useAddress  
  - useAuth  
  - useCartActions     
  - useCategories  
  - useCollection  
  - useDeals  
  - useFilters  
  - useMoveWishlistToCart  
  - useOrders  
  - useProducts  
  - useRelatedProducts  
  - useReviews  
##### These hooks reduce duplication and make the UI easier to maintain.  

### Deployment
- **Docker** multi‑stage builds for both frontend and backend
- **Backend** deployed to **Render** (free tier) via Docker
- **Frontend** deployed to **Vercel**
- The backend was also tested on AWS EC2 during the deployment process.



### Getting Started
#### Prerequisites
- Node.js 22+
- npm
- PostgreSQL database
#### Backend Setup
- cd backend/server
- npm install
- npx prisma generate
- npm run dev

#### Frontend Setup
- cd frontend
- npm install
- npm run dev

### Environment Variables
#### Backend
PORT=5000

##### Authentication
JWT_SECRET=your-jwt-secret

##### Database (Prisma + Supabase)
DATABASE_URL=postgresql://user:password@host:port/db
DIRECT_URL=postgresql://user:password@host:port/db

##### Supabase Storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

##### Payments (PayPal Sandbox)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

##### OAuth
GOOGLE_CLIENT_ID=your-google-client-id

#### Frontend
VITE_API_BASE_URL=https://yourbackendapi.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id

## Scripts

### Backend
- `npm run dev` — Start backend in development mode (nodemon)
- `npm run start` — Start backend in production mode
- `npm run seed` — Seed initial data (categories, demo products, admin user)

### Frontend
- `npm run dev` — Start Vite development server
- `npm run build` — Build production-ready frontend
- `npm run preview` — Preview production build locally

###  What Makes This Project Strong for a Portfolio
- Realistic ecommerce flows
- Modular architecture
- Clean state separation between client and server data
- Secure authentication and protected routes
- Admin tools that resemble a real business dashboard
- Payment system coverage with real PayPal sandbox and mocked alternatives
- Category hierarchy that feels like an actual marketplace
- Docker deployment experience
- Production-focused frontend and backend separation
### Future Improvements
- Add full order tracking timeline updates from admin
- Add email notifications for order status changes
- Add a dedicated analytics dashboard for admins
- Add more payment options

## Author
### Built by Ahmed Amin Ahmed 

[LinkedIn](https://linkedin.com/in/a-min)  [GitHub](https://github.com/A-M1N)


## Screenshots 


![Products Grid](./screenshots/grid-products.webp)
![Products List](./screenshots/list-products.webp)
![Product Page](./screenshots/product.webp)
![Cart Page](./screenshots/cart.webp)
![Checkout S1](./screenshots/checkout1.webp)
![Checkout S2](./screenshots/checkout2.webp)
![Coupon](./screenshots/coupon.webp)
![Dropdown](./screenshots/dropdown1.webp)
![Signup Page](./screenshots/signup.webp)
![Wishlist Page](./screenshots/wishlist.webp)
![SettingsOrdersPage](./screenshots/myOrders.webp)
![AboutUs Page](./screenshots/about.webp)
![Admin Dashboard](./screenshots/adminDashboard.webp)
![Admin Products](./screenshots/adminorders.webp)

## Additional screenshots are available in the /screenshots directory



