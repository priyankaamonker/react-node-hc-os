const express = require('express');

const router = express.Router();

const {
  searchDocuments,
} = require('../controllers/documentController');

// GET /api/documents/search?q=...
router.get('/', searchDocuments);

module.exports = router;