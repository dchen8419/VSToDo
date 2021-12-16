import * as vscode from 'vscode'


export const authenticate = () => {
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`http://localhost:3002/auth/github`));
};