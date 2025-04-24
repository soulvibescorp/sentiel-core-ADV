function saveLog(entry) {
  const logs = JSON.parse(localStorage.getItem('sentinel_activity_log')) || [];
  logs.push(entry);
  localStorage.setItem('sentinel_activity_log', JSON.stringify(logs));
}

function renderLogs() {
  const logs = JSON.parse(localStorage.getItem('sentinel_activity_log')) || [];
  const list = document.getElementById('activityLogList');
  if (!list) return;

  list.innerHTML = '';
  logs.slice(-10).reverse().forEach(log => {
    const li = document.createElement('li');
    li.innerText = `[${new Date(log.timestamp).toLocaleString()}] ${log.type}: ${log.file || log.port || ''} – ${log.result || log.action || ''}`;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderLogs);
