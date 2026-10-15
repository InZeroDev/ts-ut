import { joinPkg } from "../shared";
import { builtInTypeDocUrl } from "./constants";

export function resolvePaths(...paths: string[]) {
  const gen = (pth: string): string =>
    pth.startsWith("!") ? `!${resolvePaths(pth.slice(1))}` : joinPkg(pth);

  return paths.map(gen);
}

export function replaceLinkcode(text: string) {
  return text.replace(
    /{\s*@linkcode\s*(\w+)(?:\s*([^}]+))?}/g,
    (_, name: string, placeholder?: string) => {
      const url =
        name in builtInTypeDocUrl
          ? builtInTypeDocUrl[name as keyof typeof builtInTypeDocUrl]
          : `#${name.toLowerCase()}`;
      return placeholder === undefined
        ? `[${name}](${url})`
        : `[${placeholder.replace(/</g, "\\<")}](${url})`;
    },
  );
}