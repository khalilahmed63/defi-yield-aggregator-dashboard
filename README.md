# 📊 DeFi Yield Aggregator Dashboard

⭐ If you find this useful, please star the repo - it helps a lot!

Compare and analyze DeFi yields across multiple protocols and chains in one clean dashboard.

Built with **Next.js, TypeScript, The Graph, and Tailwind CSS**.

---

## 🚀 Live Demo

https://defi-yield-aggregator-dashboard.vercel.app/

---

## 📸 Preview

![Dashboard](./public/screenshots/1.png)
![Pools](./public/screenshots/2.png)
![Analytics](./public/screenshots/3.png)

---

## ✨ Features

- 📊 Compare APR/APY across DeFi protocols
- 💰 View liquidity pools and yields
- 📈 Track TVL (Total Value Locked)
- 🌐 Multi-chain support (Ethereum, Polygon, Arbitrum, Base)
- 🔍 Filter by protocol, chain, and asset
- ⚡ Fast and responsive UI
- 🧠 Clean and intuitive dashboard design

---

## 💡 Why This Project

DeFi yield opportunities are spread across multiple protocols and chains.

Most platforms:
- are fragmented
- lack clarity
- are hard to compare

This dashboard provides a **unified, clean, and developer-friendly interface** to:
- compare yields
- analyze liquidity
- discover opportunities

---

## 🧠 How It Works

1. Fetch pool data from subgraphs
2. Normalize data across protocols
3. Calculate:
   - APR / APY
   - TVL
4. Display pools in a sortable dashboard
5. Allow filtering and comparison

---

## 🧪 Example Use Cases

- Find highest yield opportunities
- Compare DeFi protocols
- Analyze liquidity trends
- Build DeFi strategies
- Research yield farming options

---

## 🧰 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **The Graph (Subgraphs)**
- **Recharts / Chart Libraries**

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/khalilahmed63/defi-yield-aggregator-dashboard.git
cd defi-yield-aggregator-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Usage

This project exposes a normalized pools API you can use from the frontend or external clients.

### Endpoint

- `GET /api/pools`
- Local: [http://localhost:3000/api/pools](http://localhost:3000/api/pools)
- Production: `https://your-domain.vercel.app/api/pools`

### What this API does

1. Fetches raw pool data from DeFiLlama (`https://yields.llama.fi/pools`)
2. Filters to MVP protocols (currently Uniswap V3 and SushiSwap)
3. Normalizes response into one consistent pool shape
4. Returns JSON with caching headers:
   - `s-maxage=300`
   - `stale-while-revalidate=600`

### Response shape

```ts
type Pool = {
  id: string;
  protocol: string;
  chain: string;
  pair: string;
  apy: number;
  tvl: number;
  token0: string;
  token1: string;
  poolAddress: string;
  url: string;
};
```

### Success example

```json
[
  {
    "id": "0x123...",
    "protocol": "uniswap-v3",
    "chain": "Ethereum",
    "pair": "ETH-USDC",
    "apy": 8.42,
    "tvl": 10450000.35,
    "token0": "ETH",
    "token1": "USDC",
    "poolAddress": "0x123...",
    "url": "https://app.uniswap.org/explore/pools/ethereum/0x123..."
  }
]
```

### Error response

If something fails upstream, the API returns:

```json
{
  "error": "Failed to fetch pools"
}
```

with HTTP status `500`.

### How to use in frontend

```ts
const response = await fetch("/api/pools");
if (!response.ok) throw new Error("Failed to fetch pools");
const pools = await response.json();
```

### Quick curl test

```bash
curl http://localhost:3000/api/pools
```

---

## 🌍 Supported Chains

- Ethereum
- Polygon
- Base

---

## 📈 Roadmap

- [ ] Multi-protocol aggregation (Uniswap, Aave, Balancer)
- [ ] Risk indicators (impermanent loss, volatility)
- [ ] Historical yield charts
- [ ] Portfolio tracking
- [ ] Notifications for yield changes
- [ ] Wallet integration

---

## 🤝 Contributing

Contributions are welcome!

- Open issues
- Submit pull requests
- Suggest improvements

---

## 👨‍💻 Author

Khalil Ahmed

Frontend Engineer building Web3 analytics platforms.

- Portfolio: [https://www.khalilahmed.dev](https://www.khalilahmed.dev)
- LinkedIn: [https://www.linkedin.com/in/khalil-ahmed-308a061a6](https://www.linkedin.com/in/khalil-ahmed-308a061a6)
- GitHub: [https://github.com/khalilahmed63](https://github.com/khalilahmed63)

---

## ⭐ Support

If you find this project useful, please ⭐ the repo!
