const db = require("./db");
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/api/invoices", (req, res) => {

  const {
    port,
    declaration,
    date,
    total
  } = req.body;

  db.run(
    `INSERT INTO invoices
    (port, declaration, invoice_date, total_amount)
    VALUES (?, ?, ?, ?)`,
    [port, declaration, date, total],

    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        invoiceId: this.lastID
      });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});