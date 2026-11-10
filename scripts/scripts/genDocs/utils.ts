import { joinPkg } from "../shared";

export function resolvePaths(...paths: string[]) {
  const gen = (pth: string): string =>
    pth.startsWith("!") ? `!${joinPkg(pth.slice(1))}` : joinPkg(pth);

  return paths.map(gen);
}

export function convertJsDocLinks(text: string) {
  const regex = /{@(?:link(?:code)?)\s+([^}|]+)(?:\s*\|\s*([^}]+))?}/g;
  return text.replace(regex, (_, link: string, placeholder?: string) => {
    link = link.trim();
    placeholder = placeholder?.trim();

    const text = placeholder ?? link;
    if (noLinks.includes(link)) return `\`${text}\``;
    if (link in externalLinks)
      return `[${text}](${externalLinks[link as keyof typeof externalLinks]})`;
    else return `[${text}](#${link.toLowerCase()})`;
  });
}

const externalLinks = {
  Pick: "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
  Omit: "https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys",
  ReturnType: "https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype"
};

const noLinks = ["Parameters"];
