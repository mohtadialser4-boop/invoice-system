const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./invoices.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database connected");

    db.run(`
      CREATE TABLE IF NOT EXISTS invoices (
        invoice_id INTEGER PRIMARY KEY AUTOINCREMENT,
        port TEXT,
        declaration TEXT,
        invoice_date TEXT,
        total_amount REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

module.exports = db;