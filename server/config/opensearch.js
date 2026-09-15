const { Client } = require('@opensearch-project/opensearch');
require('dotenv').config();

const client = new Client({
  node: process.env.OPENSEARCH_NODE,
});

module.exports = client;