const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes'); // asumsi kamu pakai routes terpisah

// === Tambahkan Middleware ===
app.use(cors()); // ✅ Ini wajib agar CORS tidak error
app.use(express.json()); // Untuk parsing JSON body

// === Gunakan Routing ===
app.use(router);

// === Jalankan Server ===
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
