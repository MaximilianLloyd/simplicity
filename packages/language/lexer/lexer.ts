import { P, match } from "ts-pattern";
import { lookupIdent, type Token, type TokenType } from "../token/token";

export class Lexer {
  position: number;
  readPosition: number;
  ch: string | null;

  constructor(private input: string) {
    this.position = 0;
    this.readPosition = 0;
    this.ch = "";

    this.readChar();
  }

  peekChar(): string | null {
    if (this.readPosition >= this.input.length) {
      return null;
    }

    return this.input[this.readPosition];
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = null;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  peekCharIs(ch: string): boolean {
    return this.peekChar() === ch;
  }

  skipWhitespace(): void {
    while (this.ch === " " || this.ch === "\t" || this.skipNewlines()) {
      this.readChar();
    }
  }

  skipNewlines(): boolean {
    if (this.ch === "\n" || this.ch === "\r") {
      return true;
    }

    return false;
  }

  nextToken(): Token {
    this.skipWhitespace();

    const tok = matchToken(this);
    
    console.log(tok);

    this.readChar();

    return tok;
  }

  readIdentifier(): string {
    const position = this.position;
    while (isLetter(this.ch as string)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  readNumber(): string {
    const position = this.position;

    while (isDigit(this.ch as string)) {
      console.log('lol', this.ch);
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }
}

function matchToken(l: Lexer): Token {
    if (isLetter(l.ch as string)) {
      const ident = l.readIdentifier();
      const kind = lookupIdent(ident as any);
      return newToken(kind, ident);
  } else if (isDigit(l.ch as string)) {
      const num = l.readNumber();
      return newToken("INT", num);
  }


  return match(l.ch)
    .with("=", (val) => newToken("ASSIGN", val))
    .with(";", (val) => newToken("SEMICOLON", val))
    .otherwise(() => newToken("ILLEGAL", l.ch as string));
}

function newToken(tokenType: TokenType, ch: string): Token {
  return { kind: tokenType, Literal: ch };
}

function isLetter(ch: string): boolean {
  return ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z") || ch === "_";
}

function isDigit(ch: string): boolean {
  return ch !== null && "0" <= ch && ch <= "9";
}
