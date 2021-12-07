import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	vscode.window.registerWebviewViewProvider(
		"vstodo-sidebar",
		sidebarProvider
	)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.helloWorld', () => {
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.refresh', () => {
			HelloWorldPanel.kill();
			HelloWorldPanel.createOrShow(context.extensionUri);
			setTimeout( () => {
			vscode.commands.executeCommand(
				"workbench.action.webview.openDeveloperTools"
				);
			}, 500);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.askQuestion", async () => {
			const answer = await vscode.window.showInformationMessage("How was your day?", "Good", "Bad");

			if (answer === 'Bad') {
				vscode.window.showInformationMessage("Sorry to hear that");
			} else {
				vscode.window.showInformationMessage("I hope your day continues to be good");
			}
		})
	);
}

export function deactivate() {}
