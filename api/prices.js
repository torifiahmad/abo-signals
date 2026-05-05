export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const pairs = ['EURUSD=X', 'GBPUSD=X', 'JPY=X', 'CHF=X', 'CAD=X', 'AUDUSD=X', 'NZDUSD=X'];
    const urls = pairs.map(p => `https://query1.finance.yahoo.com/v8/finance/chart/${p}`);
    
    const results = await Promise.all(urls.map(u => fetch(u, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }).then(r => r.json())));
    
    const rates = {};
    results.forEach(d => {
      if (d.chart && d.chart.result && d.chart.result.length > 0) {
        const sym = d.chart.result[0].meta.symbol;
        const price = d.chart.result[0].meta.regularMarketPrice;
        if (sym === 'EURUSD=X') rates.EURUSD = price;
        if (sym === 'GBPUSD=X') rates.GBPUSD = price;
        if (sym === 'JPY=X') rates.USDJPY = price;
        if (sym === 'CHF=X') rates.USDCHF = price;
        if (sym === 'CAD=X') rates.USDCAD = price;
        if (sym === 'AUDUSD=X') rates.AUDUSD = price;
        if (sym === 'NZDUSD=X') rates.NZDUSD = price;
      }
    });

    res.status(200).json({ rates });
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Failed to fetch live prices' });
  }
}
