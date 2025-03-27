const fs = require("fs");
const path = require("path");
const { VMBuilder, OperationCodes, Compiler } = require("./dist");

const compiler = new Compiler();

const bytecode = compiler.compile(fs.readFileSync(path.resolve(__dirname, 'resources', 'input.js')));

const vmBuilder = new VMBuilder(OperationCodes);

vmBuilder.build(bytecode)
  .then((vm) => fs.writeFileSync(path.resolve(__dirname, 'resources', 'output.js'), vm));