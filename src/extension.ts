import * as vscode from 'vscode';
const fs = require('fs');
const path = require('path');

// Global output channel
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    // Create output channel for the extension
    outputChannel = vscode.window.createOutputChannel('Muh2 Cashbox Extension');
    outputChannel.appendLine('Muh2 Cashbox Extension activated');
    
    // Register completion provider for muh2 language
    const provider = vscode.languages.registerCompletionItemProvider(
        { language: 'muh2' },
        new Muh2CompletionProvider(outputChannel),
        ' ' // Trigger on space
    );

    context.subscriptions.push(provider);
    context.subscriptions.push(outputChannel);
}

class Muh2CompletionProvider implements vscode.CompletionItemProvider {
    private outputChannel: vscode.OutputChannel;

    constructor(outputChannel: vscode.OutputChannel) {
        this.outputChannel = outputChannel;
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.CompletionItem[] {
        // Log when the method is called
        this.outputChannel.appendLine('Hello Muh2 - provideCompletionItems() called');

        // Get the current line
        const line = document.lineAt(position.line);
        const lineText = line.text;

        let completionItems: vscode.CompletionItem[] = [];

        try {
            // const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            // if (!workspaceFolder) {
            //     this.outputChannel.appendLine('ERROR: getWorkspaceFolder() failed for: ' + document.uri);
            //     return [];
            // }
            const jsonPath = path.join(path.dirname(document.uri.fsPath), 'codecompletion_buchungen.json');
            this.outputChannel.appendLine('Loading completion data from: ' + jsonPath);
            
            const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

            if (Array.isArray(jsonData)) {
                completionItems = jsonData.map(item =>
                    this.createCompletionItem(item.label || item.id, item.detail || item.description)
                );
                this.outputChannel.appendLine(`Loaded ${completionItems.length} completion items`);
            }
        } catch (error) {
            this.outputChannel.appendLine('ERROR: Failed to read codecompletion_buchungen.json: ' + error);
        }

        // Check if we're in a journal entry context
        const journalEntryRegex = /^\d{4}-\d{2}-\d{2}\w+\s+(b|f|vorschlag)\s+\-?\d+\.\d+\s+$/;
        const textBeforeCursor = lineText.substring(0, position.character);


        // Only provide completions if we're at the identifier position
        if (journalEntryRegex.test(textBeforeCursor)) {
            this.outputChannel.appendLine(`Providing ${completionItems.length} completions for journal entry pattern`);
            return completionItems;
        }

        // Also check for partial matches when user starts typing
        const partialRegex = /^\d{4}-\d{2}-\d{2}\w+\s+(b|f|vorschlag)\s+\-?\d+\.\d+\s+[a-zA-Z_-]*$/;
        if (partialRegex.test(textBeforeCursor)) {
            this.outputChannel.appendLine(`Providing ${completionItems.length} completions for partial pattern`);
            return completionItems;
        }

        this.outputChannel.appendLine('No completion pattern matched, returning empty list');
        return [];
    }

    private createCompletionItem(label: string, detail: string): vscode.CompletionItem {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
        item.detail = detail;
        item.insertText = label;
        return item;
    }
}

export function deactivate() { }