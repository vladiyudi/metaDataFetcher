const axios = require('axios');
const cheerio = require('cheerio');


async function fetchMetadata(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      return {
        url,
        title: $('title').text() || $('meta[property="og:title"]').attr('content') || '',
        description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '',
        image: $('meta[property="og:image"]').attr('content') || ''
      };
    } catch (error) {
      return { url, error: 'Failed to fetch metadata' };
    }
  }

  module.exports = {fetchMetadata};