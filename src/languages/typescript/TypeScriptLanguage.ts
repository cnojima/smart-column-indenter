import Language from "../Language";
import LineOfCode from '../LineOfCode';
import TypeScriptToken, * as token from "./TypeScriptToken";

export default class TypeScriptLanguage extends Language<TypeScriptToken> {

    private code: string;
    private position: number;
    private tokens: TypeScriptToken[];

    private endOfCode(): boolean {
        return this.position >= this.code.length;
    }

    public token2string(token: TypeScriptToken, intersectionWords: Set<string>): string
    {
        switch (token.kind) {
            case "symbol": return token.content || "";
            case "reserved word": return token.content || "";
            case "word": return intersectionWords.has(token.content || "") ? `${token.kind}[${token.content}]` : token.kind;
            default: return token.kind;
        }
    }

    public stringify(lines: (TypeScriptToken|undefined)[][], indentation: string, lineBreak: string): string
    {
        const stringifiedLines = lines.map(line => "");

        for (let column = 0; column < lines[0].length; column++) {
            const lengths = lines.map(l => {
                const token = l[column];
                return (token && token.content || "").length;
            });
            const maxLength = Math.max(...lengths);

            for (let i = 0; i < lines.length; i++) {
                const token = lines[i][column];
                const content = token && token.content || "";
                stringifiedLines[i] += this.pad(content, maxLength);
            }
        }

        return stringifiedLines.map(line => indentation + line).join(lineBreak);
    }

    public tokenize(lines: string[]): LineOfCode<TypeScriptToken>[]
    {
        return lines.map(line => {
            this.code = line;
            this.position = 0;
            this.tokens = [];
            
            do  {
                this.tokens.push(this.readSymbol());
            } while(!this.endOfCode());

            return this.tokens;
        });
    }

    private readSymbol(): TypeScriptToken
    {
        while(this.code[this.position] === " ") {
            this.position++;
        }

        let nextChar = this.code[this.position];

        if (nextChar.match(/[a-zA-Z0-9_]/)) {
            let content = [];
            do {
                content.push(nextChar);
                nextChar = this.code[++this.position];
            } while(nextChar.match(/[a-zA-Z0-9_$.]/));
            return this.createWordToken(content.join(""));
        }
        else if (nextChar.match(/[\[\](){}:;,.=<>!%/*+-]/)) {
            this.position++;
            return new TypeScriptToken("symbol", nextChar);
        }
        else if (nextChar.match(/["'`\/]/)) {
            this.position++;
            let stringDelimiter = nextChar;
            let content = [nextChar];
            let prevChar = "";
            do {
                prevChar = nextChar;
                nextChar = this.code[this.position++];
                content.push(nextChar);
            } while(nextChar !== stringDelimiter || prevChar === "\\");
            return new TypeScriptToken("string", content.join(""));
        }
        else {
            throw new Error("Invalid charater!");
        }
    }

    private createWordToken(content: string): TypeScriptToken
    {
        if (token.reservedWords.indexOf(content) > -1) {
            const type = token.reservedWordType[content] || "reserved word";
            return new TypeScriptToken(type, content);
        }
        else {
            return new TypeScriptToken("word", content);
        }
    }
}
