const { app, BrowserWindow, ipcMain } = require('electron')
const { WebSocketServer  } = require('ws')

const wss = new WebSocketServer({
  port: 1234,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
});

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true
      }
    })
  
    win.loadFile('index.html')
    return win
  }

  app.whenReady().then(() => {
    let win = createWindow();
    let contents = win.webContents
    console.log(123, contents.getPrinters())
    // win.hide();

    wss.on('connection', function (ws) {
      ws.on('message', function (event) {
        win.send("reply", JSON.parse(event))
        ws.send('get imgs');
      });
    });

    ipcMain.on("ready-print", function () {
      contents.print({
        silent: false,
        // deviceName: 'LENOVO S2002 S2003W Series',
        // margins: {
        //     marginType: "none"
        // },
        // landscape: false, // 横向打印
        // copies: 1, // 打印份数
      })
    })
  })