# FileFlow AI

Windows desktop file organizer built with Electron, React, TypeScript, and Vite. File metadata, operation history, rules, and settings stay on the device. The app uses a local SQLite database (`sql.js`) and never sends file content to a service.

## Run on Windows

Install Node.js 20 or newer, then from this folder run:

```powershell
corepack enable
pnpm install
pnpm build
pnpm start
```

For renderer development, run `pnpm dev`. `pnpm test` runs the category, path safety, conflict, custom-rule, AI parsing/decision, preview, hash, move, and undo checks.

## Optional AI Smart Organize

AI suggestions use the OpenAI Responses API. Set the API key in the environment before starting the app; the key is read by Electron's main process and is not saved in the local database or exposed to the renderer:

```powershell
$env:OPENAI_API_KEY = "your-api-key"
pnpm start
```

The AI option is off by default. Turn it on under **Settings**, choose a confidence threshold, then choose **AI Smart Organize** from Organize. Only files that have no matching custom rule are sent, and the request contains filenames and metadata, not file content. Suggestions require individual or bulk acceptance, followed by the regular organization preview and confirmation before any move.

## Safety behavior

- Folder access starts only after choosing a folder with the native picker.
- Scans are recursive and skip hidden entries, common system locations, and symbolic links.
- File movement starts only after the user reviews a preview and confirms.
- Sources and destinations are checked against the chosen root. Existing names receive a numbered suffix; files are not overwritten.
- Each move is logged in the local database and can be undone from History.
- Dry run does not move files.

If the key is missing or the API cannot be reached, AI suggestions are unavailable and regular organization continues to work offline.
