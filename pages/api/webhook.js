import { buffer } from 'micro';
import Stripe from 'stripe';
import prisma from '../../lib/db';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = await prisma.order.create({
      data: {
        stripeId: session.id,
        amount: session.amount_total ?? 999,
        currency: session.currency ?? 'usd',
        customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      }
    });

    const tokenValue = generateToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
    await prisma.downloadToken.create({
      data: { token: tokenValue, orderId: order.id, expiresAt }
    });

    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    const downloadUrl = `${domain}/download?token=${tokenValue}`;
    const email = order.customerEmail;
    if (email) {
      const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: 'Your ebook — Work From Home Jobs',
        html: `<p>Thank you for your purchase!</p><p><a href="${downloadUrl}">Click to download</a> — link expires in 48 hours and is single-use.</p>`
      };
      try { await sgMail.send(msg); } catch(e){ console.error('SendGrid error', e); }
    }
  }

  res.json({ received: true });
}
