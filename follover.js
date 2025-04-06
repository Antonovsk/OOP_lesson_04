const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio'); // Import Cheerio
const app = express();
const port = process.env.PORT || 3000;

const accessToken = process.env.FACEBOOK_API_ACCESS_TOKEN;

if (!accessToken) {
    console.error('Error: Facebook Access Token not found in environment variables.');
    process.exit(1); // Exit the process if the token is missing
}

// Add CORS headers to allow requests from any origin (for development).  IMPORTANT: Restrict this in production!
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your actual origin in production!
  res.header('Access-Control-Allow-Methods', 'GET'); // Allow only GET requests
  next();
});

// Helper function to scrape Facebook
async function getFacebookFollowers(pageUrl) {
  try {
    const response = await fetch(pageUrl);

    // Check for HTTP errors
    if (!response.ok) {
      console.error(`Facebook page fetch error: Status ${response.status}, Text: ${await response.text()}`);
      throw new Error(`Facebook page request failed with status ${response.status}`);
    }

    const html = await response.text(); // Get the HTML of the page

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Use the class names from your example HTML to locate the element containing the follower count
    const followerElement = $('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xkrqix3.x1sur9pj.xi81zsa.x1s688f'); // Select the element containing follower text (e.g., 4.7K)

    if (followerElement.length > 0) {
      const followerText = followerElement.text(); // Extract the text content
      const followerCount = followerText.replace(/[^0-9.,KMBT]/g, ''); // Clean up text, remove the thousand space so convert to valid number

      return followerText; // Return the raw text content
    } else {
      console.warn('Could not find the follower element on the Facebook page.');
      return 'Not Found';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
}
// Helper function to scrape other platforms that may be added
async function scrapeData(url, selector) {
  try {
    const response = await fetch(url);

    // Check for HTTP errors
    if (!response.ok) {
      console.error(`Page fetch error: Status ${response.status}, Text: ${await response.text()}`);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const html = await response.text(); // Get the HTML of the page

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Use the class names from your example HTML to locate the element containing the follower count
    const element = $(selector); // Select the element containing follower text

    if (element.length > 0) {
      return element.text(); // Return the raw text content
    } else {
      console.warn('Could not find the follower element on the Facebook page.');
      return 'Not Found';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error';
  }
}

app.get('/api/get-social-counts', async (req, res) => {
  try {
    const facebookFollowers = await getFacebookFollowers("https://www.facebook.com/trazler/followers/");
    const instagramFollowers = await scrapeData("https://www.instagram.com/trazler_com/", ".x1i10hfl.xjbqb8w.x6um1dq.x1b1mbwd.xjxan0i.x1pi30zi.x1swvt13.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz._aa_m");

    res.json({
      facebook: facebookFollowers,
      instagram: instagramFollowers
      // ... You can add other platforms here
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});