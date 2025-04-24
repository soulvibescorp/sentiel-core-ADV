async function getKey(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", encoder.encode(password),
    { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

async function encryptFile() {
  const fileInput = document.getElementById("fileInput");
  const password = document.getElementById("vaultPassword").value;
  const file = fileInput.files[0];
  const status = document.getElementById("vaultStatus");

  if (!file || !password) return status.innerText = "Select a file and enter a password.";

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(password, salt);
  const fileData = new Uint8Array(await file.arrayBuffer());

  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, fileData);
  const encryptedBlob = new Blob([salt, iv, new Uint8Array(encrypted)]);

  downloadBlob(encryptedBlob, file.name + ".enc");
  status.innerText = "Encryption complete!";
}

async function decryptFile() {
  const fileInput = document.getElementById("fileInput");
  const password = document.getElementById("vaultPassword").value;
  const file = fileInput.files[0];
  const status = document.getElementById("vaultStatus");

  if (!file || !password) return status.innerText = "Select a file and enter a password.";

  const data = new Uint8Array(await file.arrayBuffer());
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const encrypted = data.slice(28);
  const key = await getKey(password, salt);

  try {
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
    downloadBlob(new Blob([new Uint8Array(decrypted)]), file.name.replace(".enc", ".decrypted"));
    status.innerText = "Decryption complete!";
  } catch (e) {
    status.innerText = "Decryption failed. Wrong password or corrupt file.";
  }
}
