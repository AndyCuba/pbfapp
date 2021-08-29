const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
};

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, '../src/assets/images/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  };

  mainWindow.on('closed', function () {
    
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
