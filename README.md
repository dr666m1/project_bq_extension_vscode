# BigQuery Extension for Visual Studio Code
<img src="https://user-images.githubusercontent.com/26474260/128605753-b1596da9-eee2-4f84-b121-cda73d06aa19.png" width=500px>

This is a Visual Studio Code extension for standardSQL, which is a SQL dialect supported by BigQuery.
The [language server](https://github.com/dr666m1/bq-extension-vscode/tree/main/server) itself is also available by other editors.

⚠️ This extension is still a work in progress, so the behavior would change frequently.

## Quick Start
ℹ️ If you OS is Windows, it is recommended to develop in WSL (See the [document](https://code.visualstudio.com/docs/remote/wsl)).
1. [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. Run `gcloud auth application-default login`
3. Install this extension from VSCode (`bq-extension-vscode`)

## Features
- Dry run on save
- Highlight error
- Show total bytes processed in status bar
- Format source code using [prettier-plugin-bq](https://github.com/dr666m1/prettier-plugin-bq) (`Shift+Alt+F`)
- Show table schema on hover
- Language configuration and syntax highlight (mostly based on [sql](https://github.com/microsoft/vscode/tree/main/extensions/sql), but slightly adjusted)

## Advanced Settings
### file extensions
This extension assumes that the file name is `xxx.bq` or `xxx.bigquery`.
If you are editting a file named `xxx.sql`, you have to map `.sql` to bigquery this way.

```
// settings.json
{
  "files.associations": {
    "*.sql": "bigquery"
  }
}
```

