export type AiDecision='pending'|'accepted'|'rejected';
export type AiSuggestion={id:string;path:string;root:string;fileName:string;currentLocation:string;suggestedCategory:string;suggestedFolder:string;subFolder:string;destination:string;confidence:number;reason:string;decision:AiDecision};
export function normalizeAiDestination(value:string){const raw=value.trim().replace(/\\/g,'/');if(!raw||raw.startsWith('/')||/^[a-z]:/i.test(raw))throw Error('Enter a relative folder path inside the selected folder.');const parts=raw.split('/');if(parts.some(p=>!p||p==='.'||p==='..'||p.includes(':')))throw Error('Destination cannot contain empty, dot, or parent folder segments.');return parts.join('/')}
export function acceptSuggestion(items:AiSuggestion[],id:string){return items.map(item=>item.id===id?{...item,decision:'accepted' as const}:item)}
export function rejectSuggestion(items:AiSuggestion[],id:string){return items.map(item=>item.id===id?{...item,decision:'rejected' as const}:item)}
export function editSuggestionDestination(items:AiSuggestion[],id:string,destination:string){const normalized=normalizeAiDestination(destination);return items.map(item=>item.id===id?{...item,destination:normalized,decision:'pending' as const}:item)}
export function acceptAllSuggestions(items:AiSuggestion[]){return items.map(item=>({...item,decision:'accepted' as const}))}
export function rejectAllSuggestions(items:AiSuggestion[]){return items.map(item=>({...item,decision:'rejected' as const}))}
