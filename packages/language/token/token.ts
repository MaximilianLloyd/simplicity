
export const tokens = {
	ILLEGAL   : "ILLEGAL",
	EOF       : "EOF",
	IDENT     : "IDENT",
	INT       : "INT",
	COMMA     : ",",
	SEMICOLON : ";",
	COLON     : ":",
	LPAREN    : "(",
	RPAREN    : ")",
	VAR       : "VAR",
	// Operators
	ASSIGN   : "=",
	PLUS     : "+",
	MINUS    : "-",
	BANG     : "!",
	ASTERISK : "*",
	SLASH    : "/",
    POWER    : "^",
	// Boolean
	RETURN : "RETURN",
} as const

export type TokenType = keyof typeof tokens

export const keywords = {
	"var":    tokens.VAR,
	"return": tokens.RETURN,
}  

export type Token = {
	kind: TokenType
	Literal: string
}

export function lookupIdent(ident: keyof typeof keywords): TokenType {
    return keywords[ident] || tokens.IDENT
}
