// globals.d.ts

declare namespace Abc {
  function someFunction(): void;
  const someConstant: number;
  let someVariable: string;

  interface SomeInterface {
    property: string;
    method(): void;
  }

  class SomeClass {
    constructor();
    memberFunction(): void;
  }

  // You can even nest namespaces
  namespace NestedNamespace {
    function nestedFunction(): boolean;
  }
}
