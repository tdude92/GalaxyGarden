import { app, BrowserWindow } from 'electron';
import path from 'path';
// get environment type
const isDevelopment = process.env.NODE_ENV !== 'production';

// open a window
const openWindow = () => {
    const win = new BrowserWindow( {
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: __dirname + './unknown.ico',
    } );

    // load HTML file
    if( isDevelopment ) {
        win.loadURL( `http://${ process.env.ELECTRON_WEBPACK_WDS_HOST }:${ process.env.ELECTRON_WEBPACK_WDS_PORT }` );
    } else {
        win.loadFile( path.resolve( __dirname, 'index.html' ) );
    }

    // log sample message
};

// when app is ready, open a window
app.on( 'ready', () => {
    openWindow();
} );

// when all windows are closed, quit the app
app.on( 'window-all-closed', () => {
    if( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

// when app activates, open a window
app.on( 'activate', () => {
    if( BrowserWindow.getAllWindows().length === 0 ) {
        openWindow();
    }
} );
