const term = new Terminal();
term.open(document.getElementById('terminal'));
const historyKey = "sentinel_terminal_history";

let history = JSON.parse(localStorage.getItem(historyKey)) || [];
let commandBuffer = '';

term.write('Booting SentinelCore CLI...\n');
setTimeout(() => {
  term.writeln('🛡️ Welcome to SentinelCore CLI v1.0');
  term.writeln('Type "help" for commands.');
  prompt();
}, 1000);

term.onData(e => {
  switch (e) {
    case '\r': // ENTER
      runCommand(commandBuffer.trim());
      history.push(commandBuffer.trim());
      localStorage.setItem(historyKey, JSON.stringify(history));
      commandBuffer = '';
      prompt();
      break;
    case '\u007F': // BACKSPACE
      if (commandBuffer.length > 0) {
        term.write('\b \b');
        commandBuffer = commandBuffer.slice(0, -1);
      }
      break;
    default:
      term.write(e);
      commandBuffer += e;
  }
});
setTimeout(() => showSystemAlert("Unauthorized port scan attempt detected."), 5000);
case 'triggeralert':
  showSystemAlert("Manual intrusion simulation triggered.");
  break;

function prompt() {
  term.write('\r\n> ');
}

function runCommand(cmd) {
  switch (cmd.toLowerCase()) {
    case 'help':
      term.writeln('Commands: help, status, logs, scan, encrypt, decrypt, clear, theme matrix, theme amber');
      break;
    case 'status':
      term.writeln('🟢 Firewall Active | 🔐 Encryption Ready');
      break;
    case 'logs':
      term.writeln('📝 Last: Scan run at 10:02 PM, no threats found.');
      break;
    case 'scan':
      term.writeln('🦠 Scanning system...');
      setTimeout(() => term.writeln('✅ No threats detected.'), 1000);
      break;
    case 'encrypt':
      term.writeln('🔐 Enter text to encrypt:');
      // In real app, input would follow, here we simulate
      setTimeout(() => term.writeln('Encrypted: a3f45e1b9... (simulated)'), 1500);
      break;
    case 'decrypt':
      term.writeln('🔓 Enter text to decrypt:');
      setTimeout(() => term.writeln('Decrypted: HelloWorld123 (simulated)'), 1500);
      break;
    case 'clear':
      term.clear();
      break;
    case 'theme matrix':
      switchTheme('matrix');
      break;
    case 'theme amber':
      switchTheme('amber');
      break;
    default:
      term.writeln(`Unknown command: ${cmd}`);
  }
}

function showSystemAlert(message) {
  term.writeln(`\x1b[31m🚨 ALERT: ${message}\x1b[0m`);
}


function switchTheme(theme) {
  const link = document.getElementById('theme-style');
  link.href = `css/themes/${theme}.css`;
  term.writeln(`🎨 Theme switched to ${theme}`);
}
case 'encrypt':
  term.writeln('📂 Select a file to simulate encryption...');
  document.getElementById('fileInput').click();
  document.getElementById('fileInput').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      term.writeln(`🔐 Encrypting "${file.name}"...`);
      setTimeout(() => {
        const fakeHash = btoa(file.name + Date.now()).slice(0, 16);
        term.writeln(`✅ Encrypted Output: ${fakeHash}.enc`);
      }, 1000);
    }
  };
  break;

case 'decrypt':
  term.writeln('📂 Select a file to simulate decryption...');
  document.getElementById('fileInput').click();
  document.getElementById('fileInput').onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      term.writeln(`🔓 Decrypting "${file.name}"...`);
      setTimeout(() => {
        const originalName = file.name.replace('.enc', '');
        term.writeln(`✅ Decrypted Output: ${originalName}`);
      }, 1000);
    }
  };
  break;
