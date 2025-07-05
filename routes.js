const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/accounts', (req, res) => {
    db.query('SELECT * FROM tbl_accounts', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/accounts/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbl_accounts WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Account not found' });
        res.json(results[0]);
    });
});

router.post('/accounts', (req, res) => {
    const { name, balance } = req.body;
    if (!name || balance === undefined) {
        return res.status(400).json({ error: 'Name and balance are required' });
    }
    db.query('INSERT INTO tbl_accounts (name, balance) VALUES (?, ?)', [name, balance], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, name, balance });
    });
});

router.put('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const { name, balance } = req.body;
    if (!name || balance === undefined) {
        return res.status(400).json({ error: 'Name and balance are required' });
    }
    db.query('UPDATE tbl_accounts SET name = ?, balance = ? WHERE id = ?', [name, balance, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Account not found' });
        res.json({ id, name, balance });
    });
});

router.delete('/accounts/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tbl_accounts WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Account not found' });
        res.json({ message: 'Account deleted' });
    });
});

router.get('/income', (req, res) => {
    const sql = `
        SELECT i.*, a.name AS account_name
        FROM tbl_income i
        JOIN tbl_accounts a ON i.account_id = a.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.get('/income/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbl_income WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Income record not found' });
        res.json(results[0]);
    });
});

router.post('/income', (req, res) => {
    const { account_id, amount, category, note } = req.body;
    if (!account_id || amount === undefined) {
        return res.status(400).json({ error: 'Account ID and amount are required' });
    }
    db.query('INSERT INTO tbl_income (account_id, amount,category, note) VALUES (?, ?, ?, ?)',
        [account_id, amount,category || null , note || null], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, account_id, amount, category, note });
        });
});

router.put('/income/:id', (req, res) => {
    const id = req.params.id;
    const { account_id, amount,category, note } = req.body;
    if (!account_id || amount === undefined) {
        return res.status(400).json({ error: 'Account ID and amount are required' });
    }
    db.query('UPDATE tbl_income SET account_id = ?, amount = ?, category = ?, note = ? WHERE id = ?',
        [account_id, amount,category || null,  note || null, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Income record not found' });
            res.json({ id, account_id, amount, category,note });
        });
});

router.delete('/income/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tbl_income WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Income record not found' });
        res.json({ message: 'Income record deleted' });
    });
});

router.get('/expenses', (req, res) => {
    db.query('SELECT * FROM tbl_expense', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/expenses/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tbl_expense WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Expense record not found' });
        res.json(results[0]);
    });
});

router.post('/expenses', (req, res) => {
    const { account_id, amount, category,note } = req.body;
    if (!account_id || amount === undefined ) {
        return res.status(400).json({ error: 'Account ID and amount are required' });
    }
    db.query('INSERT INTO tbl_expense (account_id, amount, category, note) VALUES (?, ?, ?, ?)',
        [account_id, amount, category || null,note || null], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, account_id, amount,category,note });
        });
});

router.put('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const { account_id, amount,category, note } = req.body;
    if (!account_id || amount === undefined) {
        return res.status(400).json({ error: 'Account ID and amount are required' });
    }
    db.query('UPDATE tbl_expense SET account_id = ?, amount = ?, category = ?, note = ? WHERE id = ?',
        [account_id, amount, category || null,note || null , id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense record not found' });
            res.json({ id, account_id, amount, category,note });
        });
});

router.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tbl_expense WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense record not found' });
        res.json({ message: 'Expense record deleted' });
    });
});

module.exports = router;
