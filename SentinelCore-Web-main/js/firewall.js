const portInput = document.getElementById('portInput');
const rulesList = document.getElementById('rulesList');

function getRules() {
  return JSON.parse(localStorage.getItem('sentinel_firewall_rules')) || [];
}

function saveRules(rules) {
  localStorage.setItem('sentinel_firewall_rules', JSON.stringify(rules));
}

function renderRules() {
  const rules = getRules();
  rulesList.innerHTML = '';
  rules.forEach((rule, index) => {
    const li = document.createElement('li');
    li.innerHTML = `Port ${rule.port} – <strong>${rule.action.toUpperCase()}</strong>
      <button onclick="deleteRule(${index})">❌</button>`;
    rulesList.appendChild(li);
  });
}

function addRule(action) {
  const port = parseInt(portInput.value);
  if (!port || port < 1 || port > 65535) return alert('Enter a valid port number.');

  const rules = getRules();
  rules.push({ port, action });
  saveRules(rules);
  renderRules();
  portInput.value = '';
}

function deleteRule(index) {
  const rules = getRules();
  rules.splice(index, 1);
  saveRules(rules);
  renderRules();
}

renderRules(); // Initialize on load
