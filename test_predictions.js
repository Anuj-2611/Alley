/**
 * Test script for AI Predictions API
 * Run with: node test_predictions.js
 */

const API_BASE = 'http://localhost:5000/api/predictions';

async function testAPI() {
  console.log('🧪 Testing AI Predictions API...\n');

  try {
    // Test Dashboard
    console.log('1. Testing Dashboard API...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboard`);
    const dashboardData = await dashboardResponse.json();
    
    if (dashboardData.success) {
      console.log('✅ Dashboard API working');
      console.log(`   - Total Products: ${dashboardData.summary.totalProducts}`);
      console.log(`   - Critical Alerts: ${dashboardData.summary.criticalAlerts}`);
      console.log(`   - Sales Growth: ${dashboardData.summary.salesGrowth}%`);
    } else {
      console.log('❌ Dashboard API failed:', dashboardData.message);
    }

    // Test Products
    console.log('\n2. Testing Products API...');
    const productsResponse = await fetch(`${API_BASE}/products`);
    const productsData = await productsResponse.json();
    
    if (productsData.success) {
      console.log('✅ Products API working');
      console.log(`   - Found ${productsData.predictions.length} product predictions`);
      console.log(`   - Critical: ${productsData.summary.critical}`);
      console.log(`   - Warning: ${productsData.summary.warning}`);
    } else {
      console.log('❌ Products API failed:', productsData.message);
    }

    // Test Categories
    console.log('\n3. Testing Categories API...');
    const categoriesResponse = await fetch(`${API_BASE}/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesData.success) {
      console.log('✅ Categories API working');
      console.log(`   - Found ${categoriesData.predictions.length} category predictions`);
    } else {
      console.log('❌ Categories API failed:', categoriesData.message);
    }

    // Test Individual Product (if products exist)
    if (productsData.success && productsData.predictions.length > 0) {
      const firstProduct = productsData.predictions[0];
      console.log(`\n4. Testing Individual Product API for: ${firstProduct.product.title}...`);
      
      const productResponse = await fetch(`${API_BASE}/products/${firstProduct.product.id}`);
      const productData = await productResponse.json();
      
      if (productData.success) {
        console.log('✅ Individual Product API working');
        console.log(`   - Confidence: ${productData.confidence}%`);
        console.log(`   - Method: ${productData.method}`);
        console.log(`   - Predictions: ${productData.predictions.length} days`);
      } else {
        console.log('❌ Individual Product API failed:', productData.message);
      }
    }

    console.log('\n🎉 All API tests completed!');
    console.log('\n📊 To view the predictions dashboard:');
    console.log('   Visit: http://localhost:3000/admin/predictions');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Make sure:');
    console.log('   1. Backend server is running (npm run dev)');
    console.log('   2. MongoDB is running');
    console.log('   3. You have some products and orders in the database');
  }
}

// Run the test
testAPI();

