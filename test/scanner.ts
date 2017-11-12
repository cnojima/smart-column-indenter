import * as assert from 'assert';
import * as sc from '../src/scanner';
import Config from '../src/Config';

describe('Scanner', () => {

    describe('TypeScript', () => {

        it('Single import', () => {
            const scanner = sc.ScannerFactory.getScanner({ scannerExtensionsMap: { TypeScriptScanner: ["ts"] } }, "ts");

            const code = `import * as assert from 'assert';`;
            const tokens = scanner.scan(code);

            assert.equal(tokens.length, 7);
            assert.ok(tokens[0].kind === "import export" && tokens[0].content === "import");
            assert.ok(tokens[1].kind === "symbol" && tokens[1].content === "*");
            assert.ok(tokens[2].kind === "reserved word" && tokens[2].content === "as");
            assert.ok(tokens[3].kind === "word" && tokens[3].content === "assert");
            assert.ok(tokens[4].kind === "reserved word" && tokens[4].content === "from");
            assert.ok(tokens[5].kind === "string" && tokens[5].content === "'assert'");
            assert.ok(tokens[6].kind === "symbol" && tokens[6].content === ";");
        });

        it('Escaped string delimiter', () => {
            const scanner = sc.ScannerFactory.getScanner({ scannerExtensionsMap: { TypeScriptScanner: ["ts"] } }, "ts");

            const testStr = (str: string, delimiter: string) => {
                const strContent = delimiter + str + delimiter;
                const tokens = scanner.scan(`let str = ${strContent};`);

                assert.equal(tokens.length, 5);
                assert.ok(tokens[3].kind === "string" && tokens[3].content === strContent);
            }

            testStr('simple single quotes string', "'");
            testStr("simple double quotes string", '"');
            testStr(`simple es6 template string`, "`");

            testStr('single quotes string with "other" `quotes`', "'");
            testStr("double quotes string with 'other' `quotes`", '"');
            testStr(`es6 template string with 'other' "quotes"`, "`");

            testStr('single quotes string with "other" `quotes` and the same \\\' delimiter scaped', "'");
            testStr("double quotes string with 'other' `quotes` and the same \\\" delimiter scaped", '"');
            testStr(`es6 template string with 'other' "quotes" and the same \\\` delimiter scaped`, "`");
        });

    });

});