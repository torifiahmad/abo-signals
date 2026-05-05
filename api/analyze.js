export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, max_tokens } = req.body;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192
        }
      })
    });

    const data = await response.json();
    
    // Check if there's an error from Google
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    // Extract text and format it like Anthropic's response to avoid changing frontend
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    res.status(200).json({
      content: [{ text: generatedText }]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
