import { assert } from "./utils";

class Definition {
  public dst: number;
  public scope: Scope;

  public constructor(dst: number, scope: Scope) {
    this.dst = dst;
    this.scope = scope;
  };
};

export class Scope {
  private variables: Map<string, Definition>;

  public id: number;
  public parentScope: Scope | null;

  public constructor(id: number, parentScope?: Scope) {
    this.variables = new Map();
    
    this.id = id;
    this.parentScope = parentScope ?? null;
  };

  public getVariable(name: string): Definition {
    assert(this.hasVariable(name), `Variable ${name} is not defined.`);

    return this.variables.has(name)
      ? this.variables.get(name)!
      : this.parentScope
        ? this.parentScope.getVariable(name)
        : {} as Definition;
  };

  public defineVariable(name: string): Definition {
    assert(!this.variables.has(name), `Variable ${name} is already defined.`);

    const definition = new Definition(this.variables.size, this);

    this.variables.set(name, definition);

    return definition;
  };

  public hasVariable(name: string): boolean {
    return this.variables.has(name)
      ? true
      : this.parentScope
        ? this.parentScope.hasVariable(name)
        : false;
  };
};