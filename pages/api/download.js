import prisma from '../../lib/db';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const token = req.query.token;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  const dbToken = await prisma.downloadToken.findUnique({ where: { token }, include: { order: true } });
  if (!dbToken) return res.status(404).json({ error: 'Invalid token' });
  if (dbToken.used) return res.status(403).json({ error: 'Token already used' });
  if (new Date() > dbToken.expiresAt) return res.status(403).json({ error: 'Token expired' });

  await prisma.downloadToken.update({ where: { id: dbToken.id }, data: { used: true } });

  const filePath = path.resolve('./protected/ebook.pdf');
  const stat = fs.statSync(filePath);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', 'attachment; filename="Work_From_Home_Jobs.pdf"');
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}
