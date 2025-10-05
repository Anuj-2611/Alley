/**
 * Test all updated features: sales category tracking, best sellers, and dashboard
 */

import http from 'http';

async function testAPI(endpoint, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: endpoint,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log(`✅ ${description}: ${res.statusCode}`);
          resolve({ success: true, data: result, status: res.statusCode });
        } catch (e) {
          console.log(`❌ ${description}: Failed to parse response`);
          resolve({ success: false, error: e.message });
        }
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description}: ${err.message}`);
      resolve({ success: false, error: err.message });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing All Updated Features...\n');

  // Test 1: Dashboard with best sellers
  const dashboard = await testAPI('/api/predictions/dashboard', 'Dashboard API');
  if (dashboard.success) {
    console.log(`   📊 Total Products: ${dashboard.data.summary.totalProducts}`);
    console.log(`   🚨 Critical Alerts: ${dashboard.data.summary.criticalAlerts}`);
    console.log(`   📈 Sales Growth: ${dashboard.data.summary.salesGrowth}%`);
  }

  // Test 2: Best Sellers API
  const bestSellers = await testAPI('/api/reports/best-sellers', 'Best Sellers API');
  if (bestSellers.success && bestSellers.data.length > 0) {
    console.log(`\n📈 Best Sellers (${bestSellers.data.length} products):`);
    bestSellers.data.slice(0, 3).forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.productTitle || `Product ${product.productId}`}`);
      console.log(`      Category: ${product.category} | Sold: ${product.quantitySold} | Price: ₹${product.avgPrice}`);
    });
  }

  // Test 3: Category Sales API
  const categorySales = await testAPI('/api/reports/category-sales', 'Category Sales API');
  if (categorySales.success && categorySales.data.length > 0) {
    console.log(`\n📊 Category Sales (${categorySales.data.length} categories):`);
    categorySales.data.forEach((category, index) => {
      console.log(`   ${index + 1}. ${category.category}`);
      console.log(`      Sold: ${category.quantitySold} | Revenue: ₹${category.totalRevenue} | Avg Price: ₹${category.avgPrice}`);
    });
  }

  // Test 4: Product Predictions
  const productPredictions = await testAPI('/api/predictions/products', 'Product Predictions API');
  if (productPredictions.success) {
    console.log(`\n🔮 Product Predictions: ${productPredictions.data.predictions.length} products`);
    console.log(`   Critical: ${productPredictions.data.summary.critical}`);
    console.log(`   Warning: ${productPredictions.data.summary.warning}`);
  }

  // Test 5: Category Predictions
  const categoryPredictions = await testAPI('/api/predictions/categories', 'Category Predictions API');
  if (categoryPredictions.success) {
    console.log(`\n📈 Category Predictions: ${categoryPredictions.data.predictions.length} categories`);
    categoryPredictions.data.predictions.slice(0, 2).forEach((category, index) => {
      console.log(`   ${index + 1}. ${category.category}`);
      console.log(`      Sales: ${category.totalSales} | Trend: ${category.trend}% | Confidence: ${category.confidence}%`);
    });
  }

  console.log('\n🎉 All tests completed!');
  console.log('\n📱 Frontend URLs:');
  console.log('   Admin Dashboard: http://localhost:3000/admin');
  console.log('   AI Predictions: http://localhost:3000/admin/predictions');
  console.log('   Products Management: http://localhost:3000/admin/products');
  console.log('   Customer Home: http://localhost:3000/home');
}

runTests();




