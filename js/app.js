function checkPort() {
  const port = document.getElementById('portInput').value;
  const status = document.getElementById('firewallStatus');
  const allowedPorts = [22, 80, 443];
  if (allowedPorts.includes(parseInt(port))) {
    status.textContent = `Port ${port} is allowed.`;
  } else {
    status.textContent = `Port ${port} is blocked.`;
  }
}

function scanFile() {
  const status = document.getElementById('scanStatus');
  status.textContent = 'Scan complete. No threats detected (simulation).';
}
