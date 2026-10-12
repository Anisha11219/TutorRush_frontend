# TutorRush Frontend

React + Vite frontend for TutorRush, a topic-based tutoring platform.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

## Stack

- React 19, React Router 7
- Vite
- lucide-react icons
- axios (reserved for the backend API layer)

## Structure

```
src/
  components/  Navbar, Footer
  layouts/     MainLayout
  pages/       Home, About, Contact, Login, Register, ForgotPassword, NotFound
```

## Status

Login, Register, Forgot Password and Contact forms validate input on the client
but are not yet connected to a backend. Each form shows a clear notice instead
of pretending to succeed.
