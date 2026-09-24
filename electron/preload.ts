import { contextBridge, ipcRenderer } from 'electron';
import type { AiSuggestion } from './ai-decisions';
contextBridge.exposeInMainWorld('fileflow', {
 appVersion:()=>ipcRenderer.invoke('app:version'), checkForUpdates:()=>ipcRenderer.invoke('updates:check'),
 selectFolder:()=>ipcRenderer.invoke('folder:select'), scan:(path:string)=>ipcRenderer.invoke('files:scan',path),
 preview:(path:string,mode:string)=>ipcRenderer.invoke('files:preview',path,mode), organize:(items:unknown[],dryRun:boolean)=>ipcRenderer.invoke('files:organize',items,dryRun),
 undo:(id:number)=>ipcRenderer.invoke('operation:undo',id), history:()=>ipcRenderer.invoke('operation:history'), duplicates:(path:string)=>ipcRenderer.invoke('files:duplicates',path),
 stats:(path:string)=>ipcRenderer.invoke('files:stats',path), rules:()=>ipcRenderer.invoke('rules:list'), saveRule:(rule:unknown)=>ipcRenderer.invoke('rules:save',rule),
 deleteRule:(id:number)=>ipcRenderer.invoke('rules:delete',id), setRuleEnabled:(id:number,enabled:boolean)=>ipcRenderer.invoke('rules:enabled',id,enabled), reorderRules:(ids:number[])=>ipcRenderer.invoke('rules:reorder',ids),
 selectRuleDestination:(root:string)=>ipcRenderer.invoke('rules:select-destination',root),
 aiStatus:()=>ipcRenderer.invoke('ai:status'), suggestOrganization:(root:string)=>ipcRenderer.invoke('ai:suggest',root), aiAcceptedPreview:(root:string,items:AiSuggestion[])=>ipcRenderer.invoke('ai:accepted-preview',root,items),
 settings:()=>ipcRenderer.invoke('settings:get'), saveSettings:(s:unknown)=>ipcRenderer.invoke('settings:save',s), demo:()=>ipcRenderer.invoke('files:demo')
});
