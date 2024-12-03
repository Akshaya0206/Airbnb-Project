
async function forwardGeocode(query, limit = 5, bbox = null, proximity = null, language = "en") {
    const apiKey = "6Zjbhtv8aeGfSDtT4lEk"; 
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}&limit=${limit}&language=${language}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        console.log("Geocoding results:", data.features);
        return data.features;
      } else {
        console.log("No geocoding results found.");
        return [];
      }
    } catch (error) {
      console.error("Error occurred while fetching geocode data:", error);
      return [];
    }
    
  }
  
  module.exports = forwardGeocode; 
  
