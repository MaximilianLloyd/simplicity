import { describe, it, expect } from "bun:test";
import { tokens, type TokenType } from "../token/token";
import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("should be able to parse tokens", () => {
    const input = `var x = 5;
`;

    const tests: Array<[TokenType, string]> = [
      ["VAR", "var"],
      ["IDENT", "x"],
      ["ASSIGN", "="],
      ["INT", "5"],
    ];

    const l = new Lexer(input);

    tests.forEach(([kind, literal]) => {
      const tok = l.nextToken();

      expect(tok.kind).toEqual(kind);
      expect(tok.Literal).toEqual(literal);
    });
  });
});
