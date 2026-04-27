// Quick test to verify API authentication
async function testAuth() {
  console.log("🔍 Testing API authentication...\n");

  // Test 1: GET /api/user without token (should be 401)
  console.log("Test 1: GET /api/user without token");
  try {
    const res = await fetch("http://localhost:3000/api/user");
    console.log("Status:", res.status);
    if (res.status === 401) console.log("✓ Correctly returns 401\n");
  } catch (err) {
    console.error("Error:", err);
  }

  // Test 2: Check current cookies
  console.log("Test 2: Checking document.cookie in browser");
  console.log("Cookies:", document.cookie || "No cookies found\n");

  // Test 3: Try login with test credentials
  console.log("Test 3: Attempting login...");
  try {
    const loginRes = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "test123",
      }),
    });
    console.log("Login status:", loginRes.status);
    if (loginRes.ok) {
      const data = await loginRes.json();
      console.log("✓ Login successful:", data);
      console.log("Cookies after login:", document.cookie);
    }
  } catch (err) {
    console.error("Login error:", err);
  }
}

testAuth();
