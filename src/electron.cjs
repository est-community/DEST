const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const fs = require("fs")
var fus;
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}
setupTitlebar();
const serveURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	
	

	  
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});
	
	const mainWindow = new BrowserWindow({
		icon: "dest.png",
		backgroundColor: 'whitesmoke',
		frame: false,
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		titleBarStyle: 'hidden',
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, "preload.cjs")
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
		fullscreenable: true
		
	});
	fus = false
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
	
	windowState.manage(mainWindow);
	mainWindow.setFullScreen(false)
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});
	mainWindow.webContents.on('new-window', function(e, url) {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	  });
	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});
	attachTitlebarToWindow(mainWindow);
	ipcMain.on('writeSettings', (event, json) => {
		fs.writeFile("./settings.json", json, (err) => {
			if (err) throw err;
		
			console.log("The file was succesfully saved!");
		}); 
	  })
	ipcMain.on('fullscreen', (event ) => {
		if (fus == false) {
			mainWindow.setFullScreen(true);
			fus = true
			
		} else {
			mainWindow.setFullScreen(false)
			fus = false
		}
	})
	  ipcMain.on('readSettings', (event, a) => {
		fs.readFile("./settings.json", 'utf8', function (err,data) {
			if (err) {
			  event.sender.send("file_contents", "nothing")
			} else {
				event.sender.send("file_contents", data)
			}
			
		  })
	  })
	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Go to settings',
			click() {
				loadSettings(port)
			}
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function loadSettings(port) {
	mainWindow.loadURL(`http://localhost:${port}/settings`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

const mainMenuTemplate = [
	{ label:'File',
				submenu: [
			  {label:'Play/Pause', click() {
				mainWindow.webContents.send('playpauseconnection')
			  }},
			  {label:'Go to settings', click() {
				loadSettings(port)
			  }},
			  {type: 'separator'},
			  {label: 'Reload', click() {
				mainWindow.webContents.reloadIgnoringCache()
			  }},
			  {type: 'separator'},
			  {label:'Exit', click() {
				app.exit()
				
			  }},
			  {label: 'Restart', click() {
				app.relaunch()
				app.exit()
			  }}
		  ]    },
	{ label: 'View', submenu: [
		{label: 'Fullscreen', click() {
			if (fus == false) {
				mainWindow.setFullScreen(true);
				fus = true
				
			} else {
				mainWindow.setFullScreen(false)
				fus = false
			}
				
		
			
		}}
	]}
]; 

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => { mainWindow = null });

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

