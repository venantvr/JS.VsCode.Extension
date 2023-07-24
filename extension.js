// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function surlignerFichier() {
	// Récupérer le chemin du fichier sur lequel l'utilisateur a cliqué avec le bouton droit
	const fileUri = vscode.window.activeTextEditor?.document.uri;
	if (fileUri) {
		// Créer un objet Range pour surligner tout le fichier
		const startPosition = new vscode.Position(0, 0);
		const endPosition = new vscode.Position(Number.MAX_VALUE, Number.MAX_VALUE);
		const wholeFileRange = new vscode.Range(startPosition, endPosition);

		// Créer un TextEditorDecorationType pour le surlignement
		const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'yellow', // Couleur de fond de surlignement
		});

		// Surligner le fichier
		vscode.window.activeTextEditor?.setDecorations(decorationType, [wholeFileRange]);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Créer un nouvel élément dans le menu contextuel des fichiers
	const disposable1 = vscode.commands.registerCommand('venantvr-highlighter.surlignerFichier', surlignerFichier);

	// Ajouter l'élément au menu contextuel des fichiers
	context.subscriptions.push(disposable1);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "venantvr-highlighter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('venantvr-highlighter.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from venantvr-highlighter!');
	});

	context.subscriptions.push(disposable);

	// Ajouter l'élément au menu contextuel des fichiers
	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider(
			{ pattern: "**/*" },
			{
				provideCodeLenses(document) {
					return [
						{
							command: 'venantvr-highlighter.surlignerFichier',
							title: 'Surligner le fichier',
						},
					];
				},
			}
		)
	);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
