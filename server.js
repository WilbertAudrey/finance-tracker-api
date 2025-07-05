const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes'); 

app.use(cors()); 
app.use(express.json()); 

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
