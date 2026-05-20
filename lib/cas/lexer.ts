export type Tok =
  | { kind: 'num'; value: string }
  | { kind: 'ident'; value: string }
  | { kind: 'op'; value: '+' | '-' | '*' | '/' | '^' | '=' | '(' | ')' | ',' }
  | { kind: 'eof' };

export function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\n') { i++; continue; }
    if ((c >= '0' && c <= '9') || (c === '.' && src[i+1] >= '0' && src[i+1] <= '9')) {
      let j = i;
      while (j < src.length && ((src[j] >= '0' && src[j] <= '9') || src[j] === '.')) j++;
      if (src[j] === 'e' || src[j] === 'E') {
        j++;
        if (src[j] === '+' || src[j] === '-') j++;
        while (j < src.length && src[j] >= '0' && src[j] <= '9') j++;
      }
      toks.push({ kind: 'num', value: src.slice(i, j) });
      i = j; continue;
    }
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_') {
      let j = i;
      while (j < src.length && ((src[j] >= 'a' && src[j] <= 'z') || (src[j] >= 'A' && src[j] <= 'Z') || (src[j] >= '0' && src[j] <= '9') || src[j] === '_')) j++;
      toks.push({ kind: 'ident', value: src.slice(i, j) });
      i = j; continue;
    }
    if ('+-*/^=(),'.includes(c)) {
      toks.push({ kind: 'op', value: c as any });
      i++; continue;
    }
    throw new Error(`Unexpected character '${c}' at position ${i}`);
  }
  toks.push({ kind: 'eof' });
  return toks;
}
