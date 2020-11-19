declare module WebdriverIO{

    interface Browser{}
    interface Element{
        jsClick: ()=> void
    }
}

// add to tsconfig.json     "typeRoots": ["./types"]
