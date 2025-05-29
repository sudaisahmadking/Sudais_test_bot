const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation;
    const sender = msg.key.remoteJid;

    if (text === 'hi') {
      await sock.sendMessage(sender, { text: '👋 Hello from SudaisBot!' });
    } else if (text === 'menu') {
      await sock.sendMessage(sender, {
        text: `*💥 SudaisBot Menu*\n\n• hi\n• menu\n• help\n\nMore Coming Soon...`
      });
    }
  });
}

startBot();
