import fetch from 'node-fetch';
export default async function handler(req, res) {
  const url =
    'https://gmgn.ai/defi/quotation/v1/tokens/sol?sort=volume1h_desc';
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
    },
  });
  const json = await resp.json();
  // dopasuj strukturę JSON do Pythonista
  const list = json.data.tokens.map(t => ({
    address: t.address,
    symbol: t.token_data.token_symbol,
    name: t.token_data.name,
    volume1h: t.signal_data.volume_1h,
    volume24h: t.signal_data.volume_24h,
  }));
  res.status(200).json(list);
}
