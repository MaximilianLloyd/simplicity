# language

Naislang implementation.

## Things we need to support
- numbers
- bools
- strings - be strict and have ot use ''
- lists
- objects
    - Nested objects and lists
- Files as functions - lua?
- basic types
- Transpile to yaml
- String interpolation
- keywords
    - accepts
    - config
    -

./nais/config.nais
```
accepts {
    appName: string,
}
```

-- All files here must conform
./nais/vars/
```
accepts {
    appName: string,
    env: {

    }
}

Here the accepted becomes available in env, shorthands
config {
    appName,
    env,
    spec {
    enabled: true,
    path: `${appPath}/metrics`

    }
}
```
