const fs = require("fs");
const path = require("path");
const { VMBuilder, OperationCodes, Compiler } = require("./dist");

function randomizeOpcodes() {
  const generate = () => {
    const generation = Math.floor(Math.random() * 0xFF);
    const values = Object.values(OperationCodes);

    return values.includes(generation) ? generate() : generation;
  };

  Object.keys(OperationCodes).forEach((key) => {
    OperationCodes[key] = generate();
  });
};

randomizeOpcodes();


const compiler = new Compiler();

const bytecode = compiler.compile(fs.readFileSync(path.resolve(__dirname, 'resources', 'input.js')));

const vmBuilder = new VMBuilder(OperationCodes);

vmBuilder.build(bytecode)
  .then((vm) => fs.writeFileSync(path.resolve(__dirname, 'resources', 'output.js'), vm));