import { Project, SourceFile } from "ts-morph";
import { joinDocs } from "../shared";
import path from "node:path";
import { Md } from "../utils";
import fs from "fs-extra";
import { resolvePaths } from "./utils";
import { genTypeText } from "./genTypeText";

const project = new Project();

const sourceFiles = project.addSourceFilesAtPaths(
  resolvePaths("src/*/*.ts", "!src/*/index.ts", "!src/*/_*"),
);

const groupedSourceFiles = Object.entries(
  Object.groupBy(sourceFiles, (sf) => path.basename(sf.getDirectoryPath())),
) as [string, sourceFiles: SourceFile[]][];

groupedSourceFiles.forEach(([, sourceFiles]) =>
	sourceFiles.sort((a) => {
		const aName = a.getBaseName();
		if (aName === "validation.ts") return -1;
		if (aName === "utils.ts") return 1;
		return 0;
	}),
);


for (const [group, sourceFiles] of groupedSourceFiles) {
  const outFile = joinDocs("content", group + ".mdx");

  const md = new Md();

  md.appendLine("---")
    .appendLine("title: " + group)
    .appendLine("---")
    .newLine();

  for (const sourceFile of sourceFiles) {
    const fileText = genFileText(sourceFile);
    md.appendLine("## " + sourceFile.getBaseNameWithoutExtension())
      .newLine()
      .append(fileText);
  }

  md.removeLine();

  fs.writeFileSync(outFile, md.text);
}

function genFileText(sourceFile: SourceFile) {
  const md = new Md();

  const types = sourceFile.getTypeAliases().filter((type) => type.isExported());
  for (const type of types) {
    const typeText = genTypeText(type);
    md.append(typeText);
  }

  return md.text;
}
