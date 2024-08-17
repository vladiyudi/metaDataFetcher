const {fetchMetadata} = require('../models/fetchMetadata')


const getUrlsMetadata = async (req, res, next) => {
    const { urls } = req.body;
  
    if (!urls || !Array.isArray(urls) || urls.length < 3) {
      return res.status(400).json({ error: 'Please provide at least 3 valid URLs' });
    }
  
    try {
      const results = await Promise.all(urls.map(fetchMetadata));
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching metadata' });
    }
}

module.exports = {
    getUrlsMetadata
}