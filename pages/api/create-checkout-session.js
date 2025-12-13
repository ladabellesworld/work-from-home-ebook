import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  try {
    const protocolHost = process.env.NEXT_PUBLIC_DOMAIN || `http://localhost:3000`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Work From Home Jobs — Ebook' },
            unit_amount: 999
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${protocolHost}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${protocolHost}/`
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
