import ECMAScriptVisitor from "../lib/ECMAScriptVisitor.js";

export default class Visitor extends ECMAScriptVisitor {
  start(ctx) {
    return this.visitExpressionSequence(ctx);
  }

  visitChildren(ctx) {
    let code = "";

    for (let i = 0; i < ctx.getChildCount(); i++) {
      code += this.visit(ctx.getChild(i));
    }

    return code.trim();
  }

  visitTerminal(ctx) {
    return ctx.getText();
  }

  visitPropertyExpressionAssignment(ctx) {
    const key = this.visit(ctx.propertyName());
    const value = this.visit(ctx.singleExpression());

    return `'${key}': '${value}'`;
  }

  visitNewExpression(ctx) {
    return this.visit(ctx.singleExpression());
  }

  visitNumberExpression(ctx) {
    const argumentList = ctx.arguments().argumentList();

    if (argumentList === null || argumentList.getChildCount() !== 1) {
      return "Error: Number requires one argument";
    }

    const arg = argumentList.singleExpression()[0];
    const number = this.removeQuotes(this.visit(arg));

    return `int(${number})`;
  }

  removeQuotes(str) {
    let newStr = str;

    if (
      (str.charAt[0] === '"' && str.charAt[length - 1] === '"') ||
      (str.charAt[0] === "'" && str.charAt[length - 1] === "'")
    ) {
      newStr = str.substr(1, str.length - 2);
    }
    return newStr;
  }
}
