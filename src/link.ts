import * as vscode from "vscode";

export class NSCodeDocumentLinkProvider implements vscode.DocumentLinkProvider {
  provideDocumentLinks(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.DocumentLink[]> {
    const links: vscode.DocumentLink[] = [];
    const linkRegex = /(?:https?):\/\/\S+?(?=[[\]\s])/;

    for (let i = 0; i < document.lineCount; i++) {
      if (token.isCancellationRequested) {
        return links;
      }

      const line = document.lineAt(i);
      const match = linkRegex.exec(line.text);
      if (!match) {
        continue;
      }

      const range = new vscode.Range(
        i,
        match.index,
        i,
        match.index + match[0].length,
      );
      const link = new vscode.DocumentLink(range, vscode.Uri.parse(match[0]));
      links.push(link);
    }

    return links;
  }
}
