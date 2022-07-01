// preload.cjs

const { contextBridge, ipcRenderer, Menu, dialog } = require('electron')
const fs = require("fs")
contextBridge.exposeInMainWorld(
  'eletcron', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  sendSync: (channel, data) => {
    ipcRenderer.sendSync(channel, data)
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  }}
  
)
const { Titlebar, Color }= require("custom-electron-titlebar")

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implemenation
  new Titlebar({backgroundColor: Color.fromHex("#ff3e00")});
});