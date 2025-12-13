Work From Home Ebook Site - Production Package

Steps:
1. Create .env.local with required variables (see below).
2. Install deps: npm install
3. Initialize Prisma: npx prisma migrate dev --name init
4. Run dev: npm run dev
5. Deploy on Vercel and set env vars in Vercel dashboard.

Required ENV:
STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET,
SENDGRID_API_KEY, EMAIL_FROM, NEXT_PUBLIC_DOMAIN, DATABASE_URL, ADMIN_PASSWORD

