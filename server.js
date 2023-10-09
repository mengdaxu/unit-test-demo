const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const {
  calculateMean,
  calculateStdDev,
  calculateMovingAverage
} = require('./model/stockFunctions.js');

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// In-memory database
let stocks = {
  "AAPL": { name: "Apple Inc.", prices: [150, 151, 152, 153, 154, 155, 156, 157, 158, 159] },
  // Add more stocks here...
};

// Get all stocks
app.get('/stocks', (req, res) => {
  res.json(stocks);
});

// Get a specific stock by ticker
app.get('/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker;
  const stock = stocks[ticker];
  if (stock) {
    res.json(stock);
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

// Add a new stock
app.post('/stocks', (req, res) => {
  const { ticker, name, prices } = req.body;
  if (ticker && name && prices) {
    stocks[ticker] = { name, prices };
    res.json({ message: "Stock added successfully" });
  } else {
    res.status(400).json({ message: "Invalid stock data" });
  }
});

// Update a stock's data
app.put('/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker;
  const { name, prices } = req.body;
  if (stocks[ticker] && name && prices) {
    stocks[ticker] = { name, prices };
    res.json({ message: "Stock updated successfully" });
  } else {
    res.status(400).json({ message: "Invalid stock data or ticker not found" });
  }
});

// Delete a stock
app.delete('/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker;
  if (stocks[ticker]) {
    delete stocks[ticker];
    res.json({ message: "Stock deleted successfully" });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

app.get('/stocks/:ticker/mean', (req, res) => {
  const ticker = req.params.ticker;
  const stock = stocks[ticker];
  if (stock) {
    const mean = calculateMean(stock.prices);
    res.json({ ticker, mean });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

app.get('/stocks/:ticker/stddev', (req, res) => {
  const ticker = req.params.ticker;
  const stock = stocks[ticker];
  if (stock) {
    const stddev = calculateStdDev(stock.prices);
    res.json({ ticker, stddev });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});


app.get('/stocks/:ticker/movingaverage/:window', (req, res) => {
  const ticker = req.params.ticker;
  const windowSize = parseInt(req.params.window);
  const stock = stocks[ticker];
  if (stock) {
    const movingAverage = calculateMovingAverage(stock.prices, windowSize);
    res.json({ ticker, movingAverage });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});


// Endpoint to get minimum stock price
app.get('/stocks/:ticker/min', (req, res) => {
  const ticker = req.params.ticker;
  const stock = stocks[ticker];
  if (stock) {
    const minPrice = calculateMin(stock.prices);
    res.json({ ticker, minPrice });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

// Endpoint to get maximum stock price
app.get('/stocks/:ticker/max', (req, res) => {
  const ticker = req.params.ticker;
  const stock = stocks[ticker];
  if (stock) {
    const maxPrice = calculateMax(stock.prices);
    res.json({ ticker, maxPrice });
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

