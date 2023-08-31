import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, value } = req.body;

    // Here you can process the type and value as needed
    // For example, you can broadcast the update to connected clients using WebSockets

    // Respond with a success message
    res.status(200).json({ message: 'Update sent successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}