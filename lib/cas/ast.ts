export type Node =
  | { type: 'num'; value: string }
  | { type: 'var'; name: string }
  | { type: 'const'; name: 'pi' | 'e' }
  | { type: 'unary'; op: '-' | '+'; arg: Node }
  | { type: 'binary'; op: '+' | '-' | '*' | '/' | '^'; left: Node; right: Node }
  | { type: 'call'; name: string; args: Node[] }
  | { type: 'eq'; left: Node; right: Node };
