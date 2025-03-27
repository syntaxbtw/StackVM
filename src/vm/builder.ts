import { minify } from "terser";

const intepreter: string = [
  "(function JSVM(decodeBase64Fn, bytecode) {",
    "var pointer = 0;",
    "var instructions = decodeBase64Fn(bytecode);",
    "var stack = [];",
    "var globalScope = {};",
    "var scopes = [];",

    "function call(fn, ...args) {",
      "return fn(...args);",
    "};",

    "function getScope(id) {",
      "return id === 0 ? globalScope : scopes[id] ? scopes[id] : (scopes[id] = {}, scopes[id])",
    "};",

    "function stackPush(item) {",
      "return call(stack.push.bind(stack), item);",
    "};",

    "function stackPop() {",
      "return call(stack.pop.bind(stack));",
    "};",

    "function fetchU8() {",
      "return instructions[pointer++];",
    "};",

    "function fetchU16() {",
      "return instructions[pointer++] | instructions[pointer++] << 8 | instructions[pointer++] << 16;",
    "};",

    "function fetchU32() {",
      "return instructions[pointer++] | instructions[pointer++] << 8 | instructions[pointer++] << 16 | instructions[pointer++] << 24;",
    "};",

    "function binarySum(arg$1, arg$2) {",
      "return arg$2 + arg$1;",
    "};",
    
    "function binarySub(arg$1, arg$2) {",
      "return arg$2 - arg$1;",
    "};",

    "function binaryMul(arg$1, arg$2) {",
      "return arg$2 * arg$1;",
    "};",

    "function binaryDiv(arg$1, arg$2) {",
      "return arg$2 / arg$1;",
    "};",

    "function binaryMod(arg$1, arg$2) {",
      "return arg$2 % arg$1;",
    "};",

    "function binaryLess(arg$1, arg$2) {",
      "return arg$2 < arg$1;",
    "};",

    "function binaryLessOrEqual(arg$1, arg$2) {",
      "return arg$2 <= arg$1;",
    "};",

    "function binaryGreater(arg$1, arg$2) {",
      "return arg$2 > arg$1;",
    "};",

    "function binaryGreaterOrEqual(arg$1, arg$2) {",
      "return arg$2 >= arg$1;",
    "};",

    "function binaryEqual(arg$1, arg$2) {",
      "return arg$2 == arg$1;",
    "};",

    "function binaryStrictEqual(arg$1, arg$2) {",
      "return arg$2 === arg$1;",
    "};",

    "function binaryNotEqual(arg$1, arg$2) {",
      "return arg$2 != arg$1;",
    "};",

    "function binaryStrictNotEqual(arg$1, arg$2) {",
      "return arg$2 !== arg$1;",
    "};",

    "function binaryBitShiftLeft(arg$1, arg$2) {",
      "return arg$2 << arg$1;",
    "};",

    "function binaryBitShiftRight(arg$1, arg$2) {",
      "return arg$2 >> arg$1;",
    "};",

    "function binaryUnsignedBitShiftRight(arg$1, arg$2) {",
      "return arg$2 >>> arg$1;",
    "};",

    "function binaryBitXor(arg$1, arg$2) {",
      "return arg$2 ^ arg$1;",
    "};",

    "function binaryBitAnd(arg$1, arg$2) {",
      "return arg$2 & arg$1;",
    "};",
    
    "function binaryBitOr(arg$1, arg$2) {",
      "return arg$2 | arg$1;",
    "};",

    "function binaryIn(arg$1, arg$2) {",
      "return arg$2 in arg$1;",
    "};",

    "function binaryInstanceof(arg$1, arg$2) {",
      "return arg$2 instanceof arg$1;",
    "};",

    "function logicalAnd(arg$1, arg$2) {",
      "return arg$2 && arg$1;",
    "};",

    "function logicalOr(arg$1, arg$2) {",
      "return arg$2 || arg$1;",
    "};",

    "function unaryPlus(arg$1) {",
      "return +arg$1;",
    "};",

    "function unaryMinus(arg$1) {",
      "return -arg$1;",
    "};",

    "function unaryNot(arg$1) {",
      "return !arg$1;",
    "};",

    "function unaryBitNot(arg$1) {",
      "return ~arg$1;",
    "};",

    "function load(arg$1, arg$2) {",
      "return getScope(arg$2)[arg$1];",
    "};",

    "function store(arg$1, arg$2, arg$3) {",
      "return getScope(arg$3)[arg$2] = arg$1;",
    "};",

    "function buildArray() {",
      "const length = fetchU32();",
      "const array = new Array();",
      
      "for(let i = 0; i < length; i++) {",
        "array[i] = stackPop();",
      "};",

      "return array;",
    "};",

    "function buildObject() {",
      "const length = fetchU32();",
      "const object = {};",

      "for(let i = 0; i < length; i++) {",
        "const key = stackPop();",
        "const value = stackPop();",

        "object[key] = value;",
      "};",

      "return object;",
    "};",

    "return function runVM() {",
      "for(;;) {",
        "var op = instructions[pointer++]",

        "if(op === undefined)",
          "break;",

        "switch(op) {",
          "case %STACK_PUSH_UINT8%:",
            "call(stackPush, fetchU8());",
            "break;",
          "case %STACK_PUSH_UINT16%:",
            "call(stackPush, fetchU16());",
            "break;",
          "case %STACK_PUSH_UINT32%:",
            "call(stackPush, fetchU32());",
            "break;",
          "case %STACK_PUSH_UNDEFINED%:",
            "call(stackPush, undefined);",
            "break",
          "case %BINARY_SUM%:",
            "call(stackPush, call(binarySum, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_SUB%:",
            "call(stackPush, call(binarySub, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_MUL%:",
            "call(stackPush, call(binaryMul, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_DIV%:",
            "call(stackPush, call(binaryDiv, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_MOD%:",
            "call(stackPush, call(binaryMod, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_LESS%:",
            "call(stackPush, call(binaryLess, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_LESS_OR_EQUAL%:",
            "call(stackPush, call(binaryLessOrEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_GREATER%:",
            "call(stackPush, call(binaryGreater, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_GREATER_OR_EQUAL%:",
            "call(stackPush, call(binaryGreaterOrEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_EQUAL%:",
            "call(stackPush, call(binaryEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_STRICT_EQUAL%:",
            "call(stackPush, call(binaryStrictEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_NOT_EQUAL%:",
            "call(stackPush, call(binaryNotEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_STRICT_NOT_EQUAL%:",
            "call(stackPush, call(binaryStrictNotEqual, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_BIT_SHIFT_LEFT%:",
            "call(stackPush, call(binaryBitShiftLeft, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_BIT_SHIFT_RIGHT%:",
            "call(stackPush, call(binaryBitShiftRight, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_UNSIGNED_BIT_SHIFT_RIGHT%:",
            "call(stackPush, call(binaryUnsignedBitShiftRight, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_BIT_XOR%:",
            "call(stackPush, call(binaryBitXor, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_BIT_AND%:",
            "call(stackPush, call(binaryBitAnd, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_BIT_OR%:",
            "call(stackPush, call(binaryBitOr, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_IN%:",
            "call(stackPush, call(binaryIn, stackPop(), stackPop()));",
            "break;",
          "case %BINARY_INSTANCEOF%:",
            "call(stackPush, call(binaryInstanceof, stackPop(), stackPop()));",
            "break;",
          "case %LOGICAL_AND%:",
            "call(stackPush, call(logicalAnd, stackPop(), stackPop()));",
            "break;",
          "case %LOGICAL_OR%:",
            "call(stackPush, call(logicalOr, stackPop(), stackPop()));",
            "break;",
          "case %UNARY_PLUS%:",
            "call(stackPush, call(unaryPlus, stackPop()));",
            "break;",
          "case %UNARY_MINUS%:",
            "call(stackPush, call(unaryMinus, stackPop()));",
            "break;",
          "case %UNARY_NOT%:",
            "call(stackPush, call(unaryNot, stackPop()));",
            "break;",
          "case %UNARY_BIT_NOT%:",
            "call(stackPush, call(unaryBitNot, stackPop()));",
            "break;",
          "case %LOAD%:",
            "call(stackPush, call(load, stackPop(), stackPop()));",
            "break;",
          "case %STORE%:", 
            "call(stackPush, call(store, stackPop(), stackPop(), stackPop(), stackPop()));",
            "break;",
          "case %BUILD_ARRAY%:",
            "call(stackPush, call(buildArray));",
            "break;",
          "case %BUILD_OBJECT%:",
            "call(stackPush, call(buildObject));",
            "break;",
        "};",

        "console.log(stack, globalScope);",
      "};",
    "};",
  "}).call(function () {",
    "if(typeof window !== 'undefined') {",
      "return window;",
    "} else if(typeof global !== 'undefined') {",
      "return global;",
    "} else {",
      "return new Function('return this')();",
    "};",
  "}(), function (input) {",
      "var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';",
      "var result = [];",
      "var buffer = 0, bits = 0, padding = 0;",

      "for(var i = input.length - 1; i >= 0; i--) {",
        "if(input.charAt(i) === '=')",
          "padding++;",
        "else",
          "break;",
      "};",

      "for(var i = 0; i < input.length; i++) {",
        "var char = input.charAt(i);",

        "if(char === '=')",
          "break;",

        "var index = chars.indexOf(char);",

        "if(index === -1)",
          "continue;",

        "buffer = (buffer << 6) | index;",
        "bits += 6;",

        "if(bits >= 8) {",
          "bits -= 8",
          "result.push((buffer >> bits) & 0xFF);",
          "buffer &= (1 << bits) - 1;",
        "};",
      "};",

      "if(bits > 0 && padding === 0) {",
        "result.push(buffer << (8 - bits));",
      "};",

      "return new Uint8Array(result);",
    "}, '%BYTECODE%')();",
].join('\n');


export class VMBuilder {
  public opcodes: any;

  public constructor(opcodes: any) {
    this.opcodes = opcodes;
  };

  // private randomizeOpcodes(): void {
  //   const generate = (): number => {
  //     const generation = Math.floor(Math.random() * 0xFF);
  //     const values = Object.values(this.opcodes);

  //     return values.includes(generation) ? generate() : generation;
  //   };

  //   Object.keys(this.opcodes).forEach((key) => {
  //     this.opcodes[key] = generate();
  //   });
  // };

  public async build(bytecode: string): Promise<string> {
    // this.randomizeOpcodes();
    
    let vm = intepreter;

    vm = vm.replace("%BYTECODE%", bytecode);

    Object.keys(this.opcodes).forEach((key) => {
      const op = this.opcodes[key];

      vm = vm.replace(`%${key}%`, op);
    });
  
    vm = await new Promise((resolve) => {
      minify(vm, {
        module: true,
    
        compress: false,
    
        mangle: {
          properties: true,
          reserved: ['JSVM']
        },
      }).then((res) => resolve(res.code ?? ""));
    });
  
    return vm;
  };
};