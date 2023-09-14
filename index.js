import antlr4 from "antlr4";
import ECMAScriptLexer from "./lib/ECMAScriptLexer.js";
import ECMAScriptParser from "./lib/ECMAScriptParser.js";
import Visitor from "./codegeneration/PythonGenerator.js";

const input = "{x: new Number(1)}";

const chars = new antlr4.InputStream(input);
const lexer = new ECMAScriptLexer(chars);

//lexer.strictMode = false;

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ECMAScriptParser(tokens);

const tree = parser.expressionSequence();
const output = new Visitor().start(tree);

console.log(output);
console.log(tree.toStringTree(parser.ruleNames));
