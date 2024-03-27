import { readdir } from "node:fs/promises";
import * as vscode from "vscode";
import { EXTENSION_ID } from "../const/extension";
import path from "path";

export function* generator(imagePaths: string[], extensionPath: string) {
  while (imagePaths.length) {
    const index = Math.floor(Math.random() * imagePaths.length);
    const imagePath = imagePaths[index];
    imagePaths.splice(index, 1);

    yield path.join(extensionPath, "src", "img", imagePath);
  }

  return undefined;
}

export const gutterImageGenerator = async () => {
  const extensionPath =
    vscode.extensions.getExtension(EXTENSION_ID)?.extensionPath;

  if (!extensionPath) {
    throw new Error("Unable to find extension path");
  }

  const imagePaths = await readdir(`${extensionPath}/src/img`);

  return generator(imagePaths, extensionPath);
};
