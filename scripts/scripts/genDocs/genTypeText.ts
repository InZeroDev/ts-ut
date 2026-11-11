import type { JSDoc, TypeAliasDeclaration } from "ts-morph";
import { Md } from "../utils";
import { convertJsDocLinks } from "./utils";

export function genTypeText(type: TypeAliasDeclaration) {
  const data = extractTypeData(type);

  const md = new Md();
  md.appendLine("### " + data.name)
    .newLine()

    .appendLine(data.shape);

  if (data.description) md.appendLine(data.description).newLine();
  if (data.example) md.append(data.example).newLine();
  if (data.remarks) md.append(data.remarks).newLine();
  if (data.see) md.append(data.see).newLine();

  return md.text;
}

function extractTypeData(type: TypeAliasDeclaration) {
  const name = type.getName();
  const shape = extractTypeShape(type);

  const doc = type.getJsDocs().at(-1);
  const description = extractTypeDescription(doc);
  const example = extractTypeExample(doc);
  const remarks = extractTypeNote(doc, "remarks");
  const see = extractTypeNote(doc, "see");

  return { name, shape, description, example, remarks, see };
}

function extractTypeShape(type: TypeAliasDeclaration) {
  type.setIsExported(false);
  const text = type.getText();
  const body = type.getTypeNodeOrThrow();
  const shape = text.slice(0, body.getStart() - type.getStart()).replace(/\s*=\s*$/, "");

  return new Md()
    .appendLine("```ts tab='Shape'")
    .appendLine(shape)
    .appendLine("```")

    .newLine()

    .appendLine("```ts tab='Source'")
    .appendLine(text.trim())
    .appendLine("```").text;
}

function extractTypeDescription(doc: JSDoc | undefined) {
  if (!doc) return;

  return convertJsDocLinks(doc.getDescription()?.trim());
}

function extractTypeExample(doc: JSDoc | undefined) {
  const example = doc
    ?.getTags()
    .find((t) => t.getTagName() === "example")
    ?.getCommentText();
  if (!example) return;

  return new Md()
    .appendLine("```ts title='Example'")
    .appendLine(example)
    .appendLine("```").text;
}

function extractTypeNote(doc: JSDoc | undefined, tagName: "remarks" | "see") {
  const note = doc
    ?.getTags()
    .find((t) => t.getTagName() === tagName)
    ?.getCommentText();
  if (!note) return;

  return new Md()
    .appendLine("<Callout type='info'>")
    .newLine()
    .appendLine((tagName === "see" ? "See " : "") + convertJsDocLinks(note))
    .newLine()
    .appendLine("</Callout>").text;
}
