import { parse } from "@babel/parser";
import { transform } from "@babel/standalone";
import { Statement } from "@babel/types";

export function assert(condition: any, message?: string): void {
  if(!condition) {
    throw new Error(message ?? "Assertion failed.");
  };
};

export function transpileCodeToES5(code: string): string {
  return transform(code, {
    presets: ['env']
  }).code ?? "";
};

export function codeToAST(code: string): Statement[] {
  return parse(code, {
    attachComment: false,
    sourceType: 'unambiguous'
  }).program.body;
};

export function validateInteger(integer: number, min: number, max: number): void {
  assert(integer >= min, `Integer <${integer}> out of min range: ${min}`);
  assert(integer <= max, `Integer <${integer}> out of max range: ${max}`);
};