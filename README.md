
## 1. What is the difference between `var`, `let`, and `const`?

- **`var`**
  - Function-scoped or globally scoped.
  - Can be redeclared and updated.
  - Hoisted with *undefined* initialization.
  - Example:
    ```js
    var x = 10;
    var x = 20; // Allowed
    ```

- **`let`**
  - Block-scoped (only accessible inside `{ }`).
  - Can be updated but not redeclared in the same scope.
  - Hoisted but not initialized (Temporal Dead Zone).
  - Example:
    ```js
    let y = 10;
    y = 20; // Allowed
    // let y = 30; // ❌ Not allowed in the same scope
    ```

- **`const`**
  - Block-scoped like `let`.
  - Must be initialized at the time of declaration.
  - Cannot be reassigned, but objects/arrays can still be mutated.
  - Example:
    ```js
    const z = 10;
    // z = 20; // ❌ Not allowed
    const arr = [1, 2];
    arr.push(3); // ✅ Allowed (mutation)
    ```

---

## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- **`map()`**
  - Returns a **new array** with the results of applying a function to each element.
  - Does not modify the original array.
  - Example:
    ```js
    const nums = [1, 2, 3];
    const doubled = nums.map(n => n * 2);
    // doubled = [2, 4, 6]
    ```

- **`forEach()`**
  - Executes a function for each element.
  - Does **not** return a new array (returns `undefined`).
  - Commonly used for side effects (like logging).
  - Example:
    ```js
    nums.forEach(n => console.log(n));
    ```

- **`filter()`**
  - Returns a **new array** with elements that pass a condition.
  - Example:
    ```js
    const even = nums.filter(n => n % 2 === 0);
    // even = [2]
    ```

---

## 3. What are arrow functions in ES6?

- Arrow functions are a shorter syntax for writing functions.
- They **lexically bind `this`** (inherit from the surrounding scope).
- They cannot be used as constructors (no `new`).
- Example:
  ```js
  // Traditional function
  function add(a, b) {
    return a + b;
  }

  // Arrow function
  const addArrow = (a, b) => a + b;

## 4. How does destructuring assignment work in ES6?

Destructuring allows unpacking values from arrays or properties from objects into variables.

Array Destructuring:
```js
const arr = [10, 20, 30];
const [a, b] = arr;
console.log(a, b); // 10 20

Object Destructuring:
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); // Alice 25
``` 

## 5. Explain template literals in ES6. How are they different from string concatenation?

Template literals are defined using backticks (`).

```js
const name = "Alice";
const age = 25;
They allow:

Multi-line strings.

String interpolation with ${ }.

Example:
```js
const name = "Alice";
const age = 25;
```
````js
// Using template literals

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
// Output: My name is Alice and I am 25 years old.

Difference from String Concatenation:

Before ES6 (concatenation):
````js
"My name is " + name + " and I am " + age + " years old."
````

With ES6 template literals:
````js
`My name is ${name} and I am ${age} years old.`
````