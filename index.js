import makeWASocket, { useSingleFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import fs from 'fs'

const { state, saveState } = useSingleFileAuthState('./auth_info.json')

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // QR nahi chahiye
    browser: ['SudaisBot', 'Chrome', '1.0'],
    usePairingCode: true // 🔐 important: pairing code se login hoga
  })

  sock.ev.on('creds.update', saveState)

  // 5 second baad pairing code generate hoga
  setTimeout(async () => {
    if (!sock.authState.creds.registered) {
      const code = await sock.requestPairingCode("923325582040") // apna WhatsApp number
      console.log(`📲 Pair this code in WhatsApp: ${code}`)
    }
  }, 5000)
}

startBot()
