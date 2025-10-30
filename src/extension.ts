import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register completion provider for muh2 language
    const provider = vscode.languages.registerCompletionItemProvider(
        { language: 'muh2' },
        new Muh2CompletionProvider(),
        ' ' // Trigger on space
    );
    
    context.subscriptions.push(provider);
}

class Muh2CompletionProvider implements vscode.CompletionItemProvider {
    
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.CompletionItem[] {
        
        // Get the current line
        const line = document.lineAt(position.line);
        const lineText = line.text;
        
        // Check if we're in a journal entry context
        const journalEntryRegex = /^\d{4}-\d{2}-\d{2}\w+\s+(b|f|vorschlag)\s+\-?\d+\.\d+\s+$/;
        const textBeforeCursor = lineText.substring(0, position.character);
        
        // Only provide completions if we're at the identifier position
        if (journalEntryRegex.test(textBeforeCursor)) {
            return [
                this.createCompletionItem('aa', 'Account identifier: aa'),
                this.createCompletionItem('bb', 'Account identifier: bb'), 
                this.createCompletionItem('cc', 'Account identifier: cc')
            ];
        }
        
        // Also check for partial matches when user starts typing
        const partialRegex = /^\d{4}-\d{2}-\d{2}\w+\s+(b|f|vorschlag)\s+\-?\d+\.\d+\s+[a-zA-Z_-]*$/;
        if (partialRegex.test(textBeforeCursor)) {
            return [
                this.createCompletionItem('aa', 'Account identifier: aa'),
                this.createCompletionItem('bb', 'Account identifier: bb'),
                this.createCompletionItem('cc', 'Account identifier: cc')
            ];
        }
        
        return [];
    }
    
    private createCompletionItem(label: string, detail: string): vscode.CompletionItem {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
        item.detail = detail;
        item.insertText = label;
        return item;
    }
}

export function deactivate() {}