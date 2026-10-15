import path from "node:path";

export const root = path.join(__dirname, "../../");
export const joinRoot = (...parts: string[]) => path.join(root, ...parts);

export const pkg = joinRoot("package");
export const joinPkg = (...parts: string[]) => path.join(pkg, ...parts);

export const docs = joinRoot("docs");
export const joinDocs = (...parts: string[]) => path.join(docs, ...parts);
