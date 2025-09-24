/**
 * API Demo Script
 * 
 * This script demonstrates how to use the Rapid Pulse Web API
 * Run with: node demo.js
 * 
 * Note: Requires MongoDB to be running locally
 */

const API_BASE = 'http://localhost:5000/api';

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    console.log(`${options.method || 'GET'} ${url}`);
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
    console.log('---\n');
    
    return { response, data };
  } catch (error) {
    console.error(`Error making request to ${url}:`, error.message);
    return null;
  }
}

async function runDemo() {
  console.log('🚀 Rapid Pulse Web API Demo\n');
  
  // 1. Health Check
  console.log('1. Health Check');
  await makeRequest(`${API_BASE}/health`);
  
  // 2. User Registration
  console.log('2. User Registration');
  const signupResult = await makeRequest(`${API_BASE}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'demopass123'
    })
  });
  
  if (!signupResult?.data.success) {
    console.log('❌ Demo stopped - signup failed or user already exists');
    console.log('💡 Try deleting the user from MongoDB and run again');
    return;
  }
  
  const token = signupResult.data.token;
  console.log('✅ Registration successful! Token received.');
  
  // 3. Get User Profile
  console.log('3. Get User Profile');
  await makeRequest(`${API_BASE}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  // 4. Create Tasks
  console.log('4. Create Tasks');
  const task1 = await makeRequest(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Complete project documentation',
      completed: false
    })
  });
  
  const task2 = await makeRequest(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Review code changes',
      completed: true
    })
  });
  
  // 5. Get All Tasks
  console.log('5. Get All Tasks');
  await makeRequest(`${API_BASE}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  // 6. Update Task
  if (task1?.data.success) {
    console.log('6. Update Task (Mark as completed)');
    await makeRequest(`${API_BASE}/tasks/${task1.data.data._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: true
      })
    });
  }
  
  // 7. Update User Profile
  console.log('7. Update User Profile');
  await makeRequest(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: 'Demo User Updated'
    })
  });
  
  // 8. Login Test
  console.log('8. User Login');
  await makeRequest(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'demo@example.com',
      password: 'demopass123'
    })
  });
  
  console.log('✅ Demo completed successfully!');
  console.log('💡 Check your MongoDB database to see the created data');
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This demo requires Node.js 18+ or install node-fetch');
  console.log('Run: npm install node-fetch');
  process.exit(1);
}

runDemo().catch(console.error);