const client = require('../config/opensearch');

const INDEX = process.env.OPENSEARCH_INDEX || 'users';

// GET /api/documents/search?q=laravel
exports.searchDocuments = async (req, res) => {
  try {
    const { q = '' } = req.query;

    const searchText = String(q).trim();

    if (!searchText) {
      return res.status(400).json({
        message: 'Search query is required',
      });
    }

    const response = await client.search({
      index: INDEX,

      body: {
        from: 0,
        size: 20,

        query: {
          multi_match: {
            query: searchText,

            fields: [
              'name',
              'address',
              'phone',
            ],

            fuzziness: 'AUTO',
          },
        },
      },
    });

    const hits = response.body.hits.hits;

    const documents = hits.map((hit) => ({
      id: hit._id,
      score: hit._score,
      ...hit._source,
    }));

    return res.json({
      query: searchText,
      total: response.body.hits.total,
      documents,
    });
  } catch (error) {
    console.error('OpenSearch search error:', error);

    return res.status(500).json({
      message: 'Failed to search documents',
    });
  }
};