import * as vscode from "vscode";
import { NSCodeDocumentLinkProvider } from "./link";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerDocumentLinkProvider(
      { language: "nscode" },
      new NSCodeDocumentLinkProvider(),
    ),
  );
}

export function deactivate() {}
