export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://gmgn.ai/defi/quotation/v1/tokens/sol?sort=volume1h_desc',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
      }
    );

    const json = await response.json();

    const result = json.data.tokens.map(t => ({
      address: t.address,
      symbol: t.token_data.token_symbol,
      name: t.token_data.name,
      volume1h: t.signal_data.volume_1h,
      volume24h: t.signal_data.volume_24h,
    }));

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: 'Parsing error', details: e.message });
  }
}
