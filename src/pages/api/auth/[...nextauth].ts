import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.response?.data?.message || 'Login failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}