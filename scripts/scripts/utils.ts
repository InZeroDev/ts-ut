export class Md {
  protected data: { text: string };

  constructor() {
    this.data = { text: "" };
  }

  public get text() {
    return this.data.text;
  }

  protected set text(text: string) {
    this.data.text = text;
  }

  public append(text: string) {
    return ((this.text += text), this);
  }
  public appendLine(text: string) {
    return ((this.text += text + "\n"), this);
  }
  public newLine(count: number = 1) {
    return ((this.text += "\n".repeat(count)), this);
  }
  public removeLine(count: number = 1) {
    return ((this.text = this.text.split("\n").slice(0, -count).join("\n")), this);
  }

  protected toString() {
    return this.text;
  }
}
