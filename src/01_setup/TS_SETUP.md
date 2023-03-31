# 1.**[COMPETENT]** Setting up the `TypeScript` compiler ⚙️
 
In the following exercise you will:
- setup the `TypeScript` compiler
- use the compiler to transpile `TypeScript` to `JavaScript`
- extend the `compiler configuration`

## Step by Step

#### 1. Install `TypeScript` globally

In your terminal run:
```bash
npm install typescript -g
```

#### 2. Add a `TypeScript` config file

###### 2.1 Generate a `tsconfig.json` file

Open the terminal in the root folder of this repository and run:
```bash
tsc --init
```

A `tsconfig.json` file will be created for you. Check the content of the file and the different options you can provide to the compiler.

###### 2.2 Generate a `tsconfig.json` file

In the `tsconfig.json` file change your source and target directory:

```diff
{
    compilerOptions" {
-       // "outDir": "./",
+       "outDir": "build",
    }
+   include: ["src/**/*"],
+   exclude: ["node_modules"],
}
```

💡 HINT: The `exclude` property will make sure the `IDE` and the `TypeScript` type-checker only work on our source code and the typechecking and compilation process are faster.

#### 3. Add your first `TypeScript` file and compile it

###### 3.1 In [setup/](./) add a new file called `sum.ts`
###### 3.2 In `sum.ts` add:

```typescript
export default function sum(a:number, b: number):number{
    return a + b
}
```

###### 3.3 Add a script to compile your code. In `package.json`:

```diff
{
    ...
    scripts: {
        ...
+       "build": "tsc",
        ...
    }
    ...
}

```

Run `npm run build` in your terminal and check the new [build](../build) folder.

###### 3.4 Inspect the result in the build folder. The `JavaScript` file should look like this:

![compiled_code](../../assets/part_one/compiled_sum.png)

💡 HINT: Additionally to the type checking, the `TypeScript` transpiler also adds polyfills to our code.


##### 4. Modify the `tsconfig.json` to include browser type libraries

In the `tsconfig.json` file add:
```diff
{
    compilerOptions" {
+       "lib": ["ES2015","dom"],
    }
    ...
}

```

💡 HINT: Depending on the application you are building you will have to change your `tsconfig.json` file, for example when using `react` you will need to add a `jsx` flag. 

##### 4.1 Change the target JS version you compile to, and check the polyfills

###### 4.1.1 In [setup/](./) add a new file called `arrayDestruct.ts`

In `arrayDestruct.ts` add:

```typescript
export default function arrayDestruct(list:any[]){
    const [first, ...rest] = list;
    return {first, rest}
}
```

In the `tsconfig.json` file:
```diff
{
    compilerOptions" {
        ...
+       "target": "ES3",
        ...
    }
    ...
}

```

Run `npm run build` in your terminal and check the new [build](../build) folder. In the setup folder you should see a heavily pollyfilled version of the destructuring function that uses older features of JavaScript and looks like this:
```javascript
"use strict";
exports.__esModule = true;
function arrayDestruct(list) {
    var first = list[0], rest = list.slice(1);
    return { first: first, rest: rest };
}
exports["default"] = arrayDestruct;
```

### Summary

In the following exercise you have:
- setup the `TypeScript` compiler
- used the compiler to transpile `TypeScript` to `JavaScript`
- extended the compiler configuration

### Getting Help

If you have issues with the Action Item, you can ask for help in the [Community](https://community.theseniordev.com/) or [Weekly Q&A Sessions](https://calendar.google.com/calendar/u/0?cid=Y19kbGVoajU1Z2prNXZmYmdoYmxtdDRvN3JyNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t).
