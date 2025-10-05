/**
 * Test category predictions with stock breakdown
 */

import http from 'http';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/predictions/categories',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`✅ Category Predictions API Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (result.success) {
        console.log('🎉 Category Predictions API is working!');
        console.log(`📊 Found ${result.predictions.length} categories`);
        
        result.predictions.forEach((category, index) => {
          console.log(`\n${index + 1}. ${category.category}`);
          console.log(`   - Total Sales: ${category.totalSales}`);
          console.log(`   - Total Revenue: ₹${category.totalRevenue.toLocaleString()}`);
          console.log(`   - Daily Average: ${category.avgDailySales}`);
          console.log(`   - Trend: ${category.trend}%`);
          console.log(`   - Confidence: ${category.confidence}%`);
          
          if (category.productStockPredictions && category.productStockPredictions.length > 0) {
            console.log(`   - Product Stock Breakdown:`);
            category.productStockPredictions.forEach((product, pIndex) => {
              console.log(`     ${pIndex + 1}. ${product.title}`);
              console.log(`        Stock: ${product.currentStock} | Predicted: ${product.predictedSales} | Alert: ${product.alertLevel}`);
            });
          }
        });
      } else {
        console.log('❌ API returned error:', result.message);
      }
    } catch (e) {
      console.log('❌ Failed to parse response:', e.message);
    }
  });
});

req.on('error', (err) => {
  console.log('❌ Server not running or not accessible');
});

req.end();




