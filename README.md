# 💼 KRD – projekt rekrutacyjny

Projekt stworzony na potrzeby procesu rekrutacyjnego.

🌐 **Live demo:** [https://skubi144.github.io/krd/](https://skubi144.github.io/krd/)

## ⚙️ Uruchomienie lokalne
### Dev Server
```bash
git clone https://github.com/skubi144/krd.git
cd krd
npm i
npm run dev
```
### Static assets

```bash
git clone https://github.com/skubi144/krd.git
cd krd
npm i
echo "VITE_API_URL=https://rekrutacja-webhosting-it.krd.pl" > .env.production
npm run build
npx http-server dist
```