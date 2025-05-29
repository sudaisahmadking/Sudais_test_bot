const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: ['SudaisBot', 'Chrome', '1.0'],
    usePairingCode: true
  });

  sock.ev.on('creds.update', saveState);

  setTimeout(async () => {
    if (!sock.authState.creds.registered) {
      const code = await sock.requestPairingCode("923325582040");
      console.log(`📲 Pair this code in WhatsApp: ${code}`);
    }
  }, 5000);
}

startBot();
