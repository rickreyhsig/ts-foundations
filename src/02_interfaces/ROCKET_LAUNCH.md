## Launching a Rocket using `Typescript`

Used types to program a rocket launch. In the following exercise we will practice:
- primitive types
- interfaces
- type aliases
- union types
- typing a function
- using a `type guard`
- type inference

To run `typescript` without compiling it to `javascript` you need to install the dependencies:

```bash
npm install
```

Follow the instructions bellow to get started.

#### 1. Add an interface called `Rocket`

In [rocket_launch.ts](./rocket_launch.ts) add the following:
```ts
interface Rocket{
    name: string
    payload_capacity: number
    manufacturer: Manufacturer
}
```
And we will also need a `Manufacturer` type, let's use an `enum` for that:

```ts
enum Manufacturer{
    SPACE_X,
    SOYUZ,
    BOEING,
    AIRBUS
}
```

As some of the rockets can have human passengers, lets create another interface based on `Rocket`:

```ts
interface PassengerRocket extends Rocket{
    passengers_capacity: number
}
```

#### 2. Add an interface called `RocketLaunch`

Now that we have our `Rocket` type setup, lets add a new `interface` that uses that one:

```ts
interface RocketLaunch{
    rocket: Rocket
    date: number
    name?: string // name is an optional parameter
}
```

#### 3. Use the new types in a function:

To understand if our types have worked, lets create a function that relates both of them:

```ts

export default function createRocketLaunch(rocket: Rocket, name?: string): RocketLaunch{
    const date = new Date().getTime()

    return {
        rocket,
        date,
        name
    }
}

```

#### 4. Create and use a `Rocket`:


Try to create a `Rocket`:

```ts
const ariane:Rocket = {
    name: "Ariane 5",
    payload_capacity: 10000,
    manufacturer: Manufacturer.AIRBUS
}
```

And run the `createRocketLaunch` function with it:

```ts
const arianeLaunch = createRocketLaunch(ariane, "ariane launch")

console.log(arianeLaunch)
```


Run the script using:
```bash
npm run rocket_launch
```

#### 5. Extend your usage with a `PassengerRocket`:

Try to create a `PassengerRocket`:

```ts
const dragon:PassengerRocket = {
    name: "Dragon",
    payload_capacity: 300,
    manufacturer: Manufacturer.SPACE_X,
    passengers_capacity: 3
}
```

And run the `createRocketLaunch` function with it:

```ts
const dragonLaunch = createRocketLaunch(dragon)

const nameDragonLaunch = createRocketLaunch(dragon, "the second try")


console.log(dragonLaunch)
console.log(nameDragonLaunch)
```

Run the script using:
```bash
npm run rocket_launch
```

#### 6. Use a union type for the rocket payload:

We will now add a `payload` property to our `Rocket`. Keep in mind:
- payload can be several items
- payload can be empty
- payload can be `Human` or `Satellite`

Make sure we add the `Human` and `Satellite` types to our file:

```ts
type Human = {
    name: string,
    age: number,
    weight: number,
}

type Satellite = {
    name: string,
    weight: number,
    type: string // feel free to make this an enum
}

type Payload = Human|Satellite
```

```diff
interface Rocket{
    name: string
    payload_capacity: number
    manufacturer: Manufacturer
+   payload: Array<Payload> 
}
```

Update your objects to make sure the type checking passes:
```diff
const ariane:Rocket = {
    name: "Ariane 5",
    payload_capacity: 10000,
    manufacturer: Manufacturer.AIRBUS, 
+   payload: []
}

.... 

+const kayla:Human = {
+    name: "Kayla Barron",
+    age: 34,
+    weight: 58
+}

const dragon:PassengerRocket = {
    name: "Dragon",
    payload_capacity: 300,
    manufacturer: Manufacturer.SPACE_X,
    passengers_capacity: 3,
+   payload: [kayla]
}
```

#### 7. Use the new type in the `createRocketLaunch` function:

Let's mark the launch, if is with humans or not:
```ts
interface RocketLaunch{
    rocket: Rocket
    date: number
    name?: string // name is an optional parameter
+   hasPassengers: boolean
}
```

We now need to understand if the payload is a `Human` of a `Satellite`. For that we will need a `type guard`:

```ts
function isHuman(rocketPayload: Payload): rocketPayload is Human {
  return (rocketPayload as Human).age !== undefined;
}
```

*For more on type guards, check the [docs here.](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)*


And update our function to make the type checker pass again:

```diff
export default function createRocketLaunch(rocket: Rocket, name?: string): RocketLaunch{
    const date = new Date().getTime()

+   // check if any of the payloads is of type Human
+   const hasPassengers = rocket.payload.some(payloadItem => isHuman(payloadItem))

    return {
        rocket,
        date,
        name,
        hasPassengers
    }
}
```

Run the script using:
```bash
npm run rocket_launch
```

#### 8. Extra practice: What type corresponds to the functions themselves?

For `createRocketLaunch` add this at the top of the file:
```ts
// using a type alias for the function
type CreateRocketLaunch = (rocket: Rocket, name?: string) => RocketLaunch

// you can also use an interface for it
interface CreateRocketLaunch{
    (rocket: Rocket, name?: string): RocketLaunch
}
```

And modify your function declaration:
```diff
+const createRocketLaunch: CreateRocketLaunch = (rocket, name) => {
    const date = new Date().getTime()

    // check if any of the payloads is of type Human
    const hasPassengers = rocket.payload.some(payloadItem => isHuman(payloadItem))

    return {
        rocket,
        date,
        name,
        hasPassengers
    }
}
```

**NOTE: As you can see above we can omit the parameter types, because they are inferred by the type system from the function type.**

## Wrapping Up

We recommend you try to change and extend the following structure until you feel comfortable with the `types` used. Remember, the best way to learn, is **learn by doing**.
