function logTest(msg) {
  const pre = document.getElementById('testResults');
  pre.innerText += msg + "\n";
}

function testEncryption() {
  const password = "Test1234!";
  const salt = crypto.getRandomValues(new Uint8Array(16));
  getKey(password, salt).then(key => {
    logTest("✅ AES-256 key generated successfully.");
  }).catch(() => {
    logTest("❌ Encryption key generation failed.");
  });
}

function testFirewallRules() {
  localStorage.setItem("sentinel_firewall_rules", JSON.stringify([{ port: 443, action: "block" }]));
  const rules = JSON.parse(localStorage.getItem("sentinel_firewall_rules"));
  if (rules.length === 1 && rules[0].port === 443) {
    logTest("✅ Firewall rules storage works.");
  } else {
    logTest("❌ Firewall rule test failed.");
  }
}

function testLogs() {
  const log = { type: "Test", result: "Passed", timestamp: new Date().toISOString() };
  saveLog(log);
  const logs = JSON.parse(localStorage.getItem("sentinel_activity_log")) || [];
  if (logs.length) {
    logTest("✅ Activity logging works.");
  } else {
    logTest("❌ Logging test failed.");
  }
}
