function scanFile() {
  const file = document.getElementById('fileToScan').files[0];
  const result = document.getElementById('scanResult');

  if (!file) return result.innerText = "Please select a file to scan.";

  result.innerText = "Scanning file...";
  
  setTimeout(() => {
    const clean = Math.random() > 0.3; // 70% chance clean
    const log = {
      type: 'Virus Scan',
      file: file.name,
      result: clean ? 'Clean ✅' : 'Infected 🚨',
      timestamp: new Date().toISOString()
    };

    result.innerText = `${file.name} – ${log.result}`;
    saveLog(log);
  }, 1500);
}
