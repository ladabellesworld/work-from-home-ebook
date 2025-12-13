import prisma from '../../../lib/db';
export default async function handler(req, res) {
  const secret = req.headers['x-admin-secret'];
  if (secret !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  const orders = await prisma.order.findMany({ include: { token: true }, orderBy: { createdAt: 'desc' } });
  res.json(orders);
}
