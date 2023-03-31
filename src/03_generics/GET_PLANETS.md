# 3. **[PROFICIENT]** Use `Generics` to fetch data 🏋️‍♀️

In the following exercise we will practice:
- generic functions and types
- typing a function that returns a `Promise`

Follow the instructions bellow to get started.

To run `typescript` without compiling it to `javascript` you need to install the dependencies:

```bash
npm install
```

### 1. Explore the data: we will `fetch` the planets in the  system from here
https://api.le-systeme-solaire.net/rest/bodies/

![api_response](../../assets/api_response.png)

### 2. Based on the API Data structure we will add a `Planet` type:

In [get_planets.ts](src/generics/get_planets.ts):
```ts
type Planet = {
    id: string,
    englishName: string
}

```

### 3. Install `got` as a library to fetch data

In your terminal:
```bash
npm install got@11
```

*Note: Got 12 is not yet compatible with the latest version of `Typescript`.*


### 4. Implement the `getPlanets` function:

```ts
import got from "got";

type Planet = {
    id: string,
    englishName: string
}

const apiUrl: string = "https://api.le-systeme-solaire.net/rest/bodies/";

// generic function to fetch data
const getData = async (url:string):Promise<any> => {
    const data = await got.get(url).json()
    return data
}

// just to check the results in the terminal
getData(apiUrl).then((planetList) =>
    console.log(planetList)
);
```

### ⚠️ Remember: when we use the type `any` we are losing all the benefits of the type system for that code section.


#### Try to eliminate the type any while maintaining type flexibility yourself before going to the next step.

----

###  5. Eliminating the `any` type:

To eliminate the type `any` we will transform the function in a generic one. Then we will use that generic with our specific payload.

####  5.1 Transforming `getData` into a `generic` function:

💡 HINT: Aside from `normal arguments` a `generic function` will also accept `type arguments`.

```ts
// generic function to fetch data
const getData = async <D>(url:string):Promise<D> => {
    const data = await got.get(url).json<D>()
    return data
}
```
💡 HINT: Inspect the `generic` function and try to understand all of its parts. You will find this functions in production code frequently. See the breakdown below:

![generic_function_breakdown](../../assets/part_three/generic_breakdown.png)

####  5.2 Use the `generic` function to `fetch` data:


```ts
interface ResponseData{
    bodies: Planet[]
}

// generic function to fetch data
getData<ResponseData>(apiUrl).then(data => {
    // fully typed
    data.bodies.map(planet => {
        console.log(planet.englishName)
    })
})
```
💡 HINT: Noticed our code is not `fully typed` or `type safe` because we used a `generic` instead of the `any` type.

Run the script and check the results in the terminal:
```bash
npm run get_planets
```

### 6. Calculate the total mass value of the planets:

Play with the code and try to solve this exercise alone before you proceed. 

HINT: Understand the structure of the data you get and the shape/type it will have.

SOLUTION:

##### 6.1. Complete the `Planet` type with the mass interface

Add:
```ts
type Mass={
    massValue: number,
    massExponent: number
}
```
And:

```diff
type Planet = {
    id: string,
    englishName: string,
+   mass: Mass
}

```

##### 6.2. Write a function that takes a list of planets and returns a mass number:

```ts
// our implementation of calculate total mass
const calculateTotalMass = (planetList: Planet[]): number => {
  const totalMass = planetList.reduce(
    (sum: number, plt: Planet): number => {
        if(plt.mass){
            return sum + plt.mass?.massValue * 10 ** plt.mass?.massExponent
        }else{
            return sum
        }
    },
    0
  );

  return totalMass;
};
```

##### 6.3. Check the function result with a simple `console.log`:

```diff
const getPlanets = (): Promise<Planet[]> => {
  return got
    .get(apiUrl)
    .json<ResponseData>()
    .then((data) => {
      return data.bodies;
    });
};

/// just logging the total mass
getData(apiUrl).then((planetList) =>
-   data.bodies.map(planet => {
-       console.log(planet.englishName)
-   })
+   console.log(`Total mass: ${calculateTotalMass(planetList)}`)
);
```

Run the script using:
```bash
npm run get_planets
```

And check the result in your terminal: 

![total_mass](../../assets/total_mass.png)


## Going the extra mile
We recommend you play with the code and make it yours. If you want to go deeper you could try to:

1. **[EASY]** Type the full `Planet` to reflect the data shape entirely
2. **[EASY]** Update the code so it returns only the real planets (`isPlanet = true`)
3. **[HARD]** Write a function to calculate who discovered the most planets (`discoveredBy`)
