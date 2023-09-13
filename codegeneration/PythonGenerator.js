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
}
