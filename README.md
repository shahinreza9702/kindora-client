# Kindora — Community Events Platform

**Kindora** is a community-driven social development platform where people can discover, create, and participate in local social service events. It helps communities connect and work together to make a positive impact.

🌐 **Live Website:** https://kindora-client-one.vercel.app

## ✨ Features

- **User Authentication:** Sign up and sign in using email/password, Google, or GitHub.
- **Discover Events:** Browse upcoming community events and explore event details.
- **Create Events:** Authenticated users can create social service events with relevant information.
- **Manage Events:** Event creators can update and delete their own events.
- **Join Events:** Users can join or leave events, with participation information stored in the database.
- **Personal Dashboard:** Manage created events and view joined events from private dashboard pages.
- **Profile Management:** Update your display name and profile picture.
- **Responsive Design:** Enjoy a responsive interface across desktop, tablet, and mobile devices.
- **Dark & Light Theme:** Switch between light and dark modes.
- **Protected API:** Secure backend endpoints using Better Auth and JWT verification.

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Better Auth
- Lucide React
- Sonner

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Better Auth
- JWT

## 🚀 Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

- Node.js
- npm
- Git
- A running Kindora backend

### 1. Clone the repository

```bash
git clone https://github.com/shahinreza9702/kindora-client.git
```

### 2. Navigate to the project directory

```bash
cd kindora-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
BACKEND_URL=http://localhost:5000
```

Make sure the Kindora backend is running at the configured address.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## 📁 Project Structure

```text
kindora-client/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── events/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── ...
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

## 🔐 Authentication & Security

Kindora uses Better Auth for authentication and JWT verification for protected backend API requests. Private dashboard pages and protected operations require authentication.

Never commit `.env.local` or expose private API credentials, OAuth secrets, or authentication secrets.

## 🌍 Deployment

The frontend is deployed on Vercel.

**Live Website:** https://kindora-client-one.vercel.app

## 👨‍💻 Developer

**Shahin Reza**

- GitHub: [@shahinreza9702](https://github.com/shahinreza9702)
- Portfolio: [shahinreza.vercel.app](https://shahinreza.vercel.app)

---

Built to bring communities together through meaningful social initiatives. ❤️