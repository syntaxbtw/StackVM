import * as t from "@babel/types";
import { codeToAST, isWindowProperty, transpileCodeToES5 } from "./utils";
import { MAX_UINT16_VALUE, MAX_UINT32_VALUE, MAX_UINT8_VALUE, OperationCodes } from "./constants";
import { Bytecode } from "./bytecode";
import { Scope } from "./scope";

export class Compiler {
  private bytecode: Bytecode;
  private globalScope: Scope;
  private scopes: Scope[];
  private strings: string[];
  
  public constructor() {
    this.bytecode = new Bytecode();
    this.globalScope = new Scope(0);
    this.scopes = [];
    this.strings = [];
  };

  private getCurrentScope(): Scope {
    return this.scopes.length > 0 ? this.scopes.at(-1)! : this.globalScope;
  };

  private pushScope(): number {
    const currentScope = this.getCurrentScope();

    return this.scopes.push(new Scope(currentScope.id + 1, currentScope));
  };

  private popScope(): Scope {
    return this.scopes.pop()!;
  };

  private walkNode(node: t.Node): void {
    switch(node.type) {
      case "NumericLiteral": {
        switch(true) {
          case node.value <= MAX_UINT8_VALUE:
            this.bytecode.writeU8(OperationCodes.STACK_PUSH_UINT8);
            this.bytecode.writeU8(node.value);
            break;
          case node.value <= MAX_UINT16_VALUE:
            this.bytecode.writeU8(OperationCodes.STACK_PUSH_UINT16);
            this.bytecode.writeU16(node.value);
            break;
          case node.value <= MAX_UINT32_VALUE:
            this.bytecode.writeU8(OperationCodes.STACK_PUSH_UINT32);
            this.bytecode.writeU32(node.value);
            break;
        };
        
        break;
      };

      case "StringLiteral": {
        const string = node.value.split('').reverse().join('');

        if(!this.strings.includes(string)) {
          for(const char of string.split('')) {
            this.walkNode(t.numericLiteral(char.charCodeAt(0)));
          };

          this.bytecode.writeU8(OperationCodes.REGISTER_STRING);
          this.bytecode.writeU32(string.length);

          this.strings.push(string);
        };

        const index = this.strings.indexOf(string);

        this.walkNode(t.numericLiteral(index));

        this.bytecode.writeU8(OperationCodes.STACK_PUSH_STRING);
        
        break;
      };

      case "BooleanLiteral": {
        
        break;
      };

      case "BinaryExpression": {
        this.walkNode(node.left);
        this.walkNode(node.right);

        switch(node.operator) {
          case "+":
            this.bytecode.writeU8(OperationCodes.BINARY_SUM);
            break;
          case "-":
            this.bytecode.writeU8(OperationCodes.BINARY_SUB);
            break;
          case "*":
            this.bytecode.writeU8(OperationCodes.BINARY_MUL);
            break;
          case "/":
            this.bytecode.writeU8(OperationCodes.BINARY_DIV);
            break;
          case "%":
            this.bytecode.writeU8(OperationCodes.BINARY_MOD);
            break;
          case "<":
            this.bytecode.writeU8(OperationCodes.BINARY_LESS);
            break;
          case "<=":
            this.bytecode.writeU8(OperationCodes.BINARY_LESS_OR_EQUAL);
            break;
          case ">":
            this.bytecode.writeU8(OperationCodes.BINARY_GREATER);
            break;
          case ">=":
            this.bytecode.writeU8(OperationCodes.BINARY_GREATER_OR_EQUAL);
            break;
          case "==":
            this.bytecode.writeU8(OperationCodes.BINARY_EQUAL);
            break;
          case "===":
            this.bytecode.writeU8(OperationCodes.BINARY_STRICT_EQUAL);
            break;
          case "!=":
            this.bytecode.writeU8(OperationCodes.BINARY_NOT_EQUAL);
            break;
          case "!==":
            this.bytecode.writeU8(OperationCodes.BINARY_STRICT_NOT_EQUAL);
            break;
          case "<<":
            this.bytecode.writeU8(OperationCodes.BINARY_BIT_SHIFT_LEFT);
            break;
          case ">>":
            this.bytecode.writeU8(OperationCodes.BINARY_BIT_SHIFT_RIGHT);
            break;
          case ">>>":
            this.bytecode.writeU8(OperationCodes.BINARY_UNSIGNED_BIT_SHIFT_RIGHT);
            break;
          case "^":
            this.bytecode.writeU8(OperationCodes.BINARY_BIT_XOR);
            break;
          case "&":
            this.bytecode.writeU8(OperationCodes.BINARY_BIT_AND);
            break;
          case "|":
            this.bytecode.writeU8(OperationCodes.BINARY_BIT_OR);
            break;
          case "in":
            this.bytecode.writeU8(OperationCodes.BINARY_IN);
            break;
          case "instanceof":
            this.bytecode.writeU8(OperationCodes.BINARY_INSTANCEOF);
            break;
        };
        
        break;
      };

      case "LogicalExpression": {
        this.walkNode(node.left);
        this.walkNode(node.right);

        switch(node.operator) {
          case "&&": {
            this.bytecode.writeU8(OperationCodes.LOGICAL_AND);
            
            break;
          };
          case "||": {
            this.bytecode.writeU8(OperationCodes.LOGICAL_OR);
            
            break;
          };
        };
        
        break;
      };

      case "UnaryExpression": {
        this.walkNode(node.argument);
        
        switch(node.operator) {
          case "+":
            this.bytecode.writeU8(OperationCodes.UNARY_PLUS);
            break;
          case "-":
            this.bytecode.writeU8(OperationCodes.UNARY_MINUS);
            break;
          case "!":
            this.bytecode.writeU8(OperationCodes.UNARY_NOT);
            break;
          case "~":
            this.bytecode.writeU8(OperationCodes.UNARY_BIT_NOT);
            break;
        };
        
        break;
      };

      case "ArrayExpression": {
        const elements = node.elements.reverse();

        for(const element of elements) {
          this.walkNode(element as t.Node);
        };

        this.bytecode.writeU8(OperationCodes.BUILD_ARRAY);
        this.bytecode.writeU32(elements.length);
        
        break;
      };

      case "ObjectExpression": {
        const properties = node.properties.reverse();

        for(const property of node.properties) {
          if(property.type !== 'ObjectProperty') continue;

          this.walkNode(property.key);
          this.walkNode(property.value);
        };

        this.bytecode.writeU8(OperationCodes.BUILD_OBJECT);
        this.bytecode.writeU32(properties.length);
        
        break;
      };

      case "VariableDeclaration": {
        for(const declarator of node.declarations) {
          this.walkNode(declarator);
        };

        break;
      };

      case "VariableDeclarator": {
        if(node.id.type !== 'Identifier') return;

        const currentScope = this.getCurrentScope();

        const definition = currentScope.defineVariable(node.id.name);

        this.walkNode(t.numericLiteral(definition.scope.id));
        this.walkNode(t.numericLiteral(definition.dst));
        
        if(node.init) {
          this.walkNode(node.init);
        } else {
          this.bytecode.writeU8(OperationCodes.STACK_PUSH_UNDEFINED);
        };
        
        this.bytecode.writeU8(OperationCodes.STORE);

        break;
      };

      case "Identifier": {
        const currentScope = this.getCurrentScope();

        if(currentScope.hasVariable(node.name)) {
          const definition = currentScope.getVariable(node.name);

          this.walkNode(t.numericLiteral(definition.scope.id));
          this.walkNode(t.numericLiteral(definition.dst));

          this.bytecode.writeU8(OperationCodes.LOAD);
        } else if(isWindowProperty(node.name)) {
          this.bytecode.writeU8(OperationCodes.STACK_PUSH_THIS);
          this.walkNode(t.stringLiteral(node.name));
        } else {
          this.walkNode(t.stringLiteral(node.name));
        };
        
        break;
      };

      case "ExpressionStatement": {
        this.walkNode(node.expression);
        
        break;
      };

      case "MemberExpression": {
        this.walkNode(node.object);
        this.walkNode(node.property);
        
        break;
      };

      case "BlockStatement": {
        this.pushScope();

        for(const blockNode of node.body) {
          this.walkNode(blockNode);
        };
        
        this.popScope();

        break;
      };

      case "CallExpression": {
        const args = node.arguments.reverse();
        
        for(const arg of args) {
          this.walkNode(arg);
        };

        if(node.callee.type === 'Identifier') {
          this.walkNode(node.callee);
        } else if(node.callee.type === 'MemberExpression' && node.callee.object.type === 'Identifier' && node.callee.property.type === 'Identifier') {
          this.walkNode(node.callee.object);

          if(isWindowProperty(node.callee.object.name)) {
            this.bytecode.writeU8(OperationCodes.GET_PROPERTY);
          };

          this.walkNode(node.callee.property);
        };


        this.bytecode.writeU8(OperationCodes.CALL_FUNCTION);
        this.bytecode.writeU32(args.length);
        
        break;
      };
    };
  };

  public compile(code: string): string {
    this.bytecode = new Bytecode();
    this.globalScope = new Scope(0);
    this.scopes = [];
    this.strings = [];

    const es5 = transpileCodeToES5(code);

    const ast = codeToAST(es5);

    for(const node of ast) {
      this.walkNode(node);
    };
    
    return Buffer.from(this.bytecode.buffer).toString('base64');
  };
};