##### 1、数据类型
- `void`：可以表示没有任何返回值的函数，声明 `void`变量也没有什么意义，因为只能将 `undefined` 和 `null` 赋值给它 `let unusable: void = undefined;`
- `null` 和 `undefined`：与 `void` 的区别是 `null` 和 `undefined` 是所有类型的子类型。也就是 `null` 和 `undefined` 可以赋值给其他类型的变量。`void` 不能赋值给其他类型的变量。
    ```
    // 这样不会报错
    let num: number = undefined;
    
    // 这样也不会报错
    let u: undefined;
    let num: number = u;
    
    let u: void;
    let num: number = u;
    // Type 'void' is not assignable to type 'number'.
    ```
- `any`：声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
    ```
    let something;
    something = 'seven';
    something = 7;
  
    等价于
    let something: any;
    something = 'seven';
    something = 7;
    ```

##### [2、联合类型 和 交叉类型](http://www.semlinker.com/ts-meaning-of-union-and-intersection-types/)
- [联合类型：](http://www.semlinker.com/ts-discriminated-unions/)
  - `let myFavoriteNumber: string | number`，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。
  - 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法，或者进行类型判断
    ```
    function getLength(something: string | number): number {
        return something.length;
    }
    
    // index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
    // Property 'length' does not exist on type 'number'.
    // length 不是 string 和 number 的共有属性，所以会报错。
    ```
  - 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
    ```
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';  // 被推断成 string
    console.log(myFavoriteNumber.length); // 5
    myFavoriteNumber = 7;
    console.log(myFavoriteNumber.length); // 编译时报错
    
    // index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
    ```
  
- [交叉类型：](http://www.semlinker.com/ts-intersection-types/)
  - 交叉类型（`type IStaff = IPerson & IWorker`）是将多个类型合并为一个类型，它包含了所有类型的特性
  - 如果合并过个类型的过程中，相同的成员变量 c 的类型为 `string & number`，既是 `string` 类型又是 `number` 类型，很明显这种类型是不存在的，所以混入后成员 c 的类型为 `never`。
    ```
    interface X {
      c: string;
      d: string;
    }
    
    interface Y {
      c: number;
      e: string
    }
    
    type XY = X & Y;
    type YX = Y & X;
    
    let p: XY;
    let q: YX;
    ```

- [类型保护](http://www.semlinker.com/ts-type-guard/)：类型检测，限定数据类型。
  - 主要通过 `in`、`typeof`、`instanceof` 和 `类型谓词` 来进行检测。

##### [3、函数重载](http://www.semlinker.com/ts-function-overload/)
- 当 TypeScript 编译器处理函数重载时，它会查找重载列表，尝试使用第一个重载定义。如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
另外在 `Calculator` 类中，`add(a: Combinable, b: Combinable){ }` 并不是重载列表的一部分，因此对于 add 成员方法来说，我们只定义了四个重载方法。
  ```
  class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: string, b: number): string;
    add(a: number, b: string): string;
    add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString();
    }
      return a + b;
    }
  }
  
  const calculator = new Calculator();
  const result = calculator.add('Semlinker', ' Kakuqo');
  ```
  
##### [4、非空断言](http://www.semlinker.com/ts-non-null-assertion-operator/)(为毛和kotlin这么像呢)
- `x!`：将从 x 值域中排除 `null` 和 `undefined` (和kotlin里面的空判断一样)

##### 5、声明文件
- [查询声明文件](http://www.semlinker.com/ts-meaning-of-union-and-intersection-types/)

##### [6、类型收窄](http://www.semlinker.com/ts-type-narrowing/)

##### [7、类型拓宽](http://www.semlinker.com/ts-type-widening/)
- 限制类型拓宽，确定具体类型的方法：
  - 显示的声明数据类型：
    ```
    // Type is {x：number}
    const obj = { 
      x: 1,
    };
    
    // Type is { x: 1 | 3 | 5; }
    const obj: { x: 1 | 3 | 5 } = {
      x: 1 
    };
    ```
  - 使用 `const`，因为 `const` 是常量，赋值之后不能修改，所以类型会更窄
    ```
    // Type is { x: number; y: number; }
    const obj1 = { 
      x: 1, 
      y: 2 
    }; 
    
    // Type is { x: 1; y: number; }
    const obj2 = {
      x: 1 as const,
      y: 2,
    }; 
    
    // Type is { readonly x: 1; readonly y: 2; }
    const obj3 = {
      x: 1, 
      y: 2 
    } as const;
    ```


##### [8、接口的可选属性和任意属性](https://ts.xcatliu.com/basics/type-of-object-interfaces.html)
- 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
    ```
    interface Person {
        name: string;
        age?: number;   // number | undefined
        [propName: string]: string;    // age、name必须是string的子类型
    }
  
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    ```

##### [9、`never` 类型](http://www.semlinker.com/ts-never-type/)
- `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
- `never`：是任何类型的子类型，也可以赋值给任何类型；但是 `never` 没有子类型，其他类型也不能赋值给 `never` 类型
- `never` 和 `void` 的区别：
  - 没有显式返回值的函数会隐式返回 `undefined`。尽管我们通常说这样的函数 “什么也不返回”，但实际上它是会返回的。在这些情况下，我们通常忽略返回值。在 TypeScript 中这些函数的返回类型被推断为 `void`。
    声明 `void`变量也没有什么意义，因为只能将 `undefined` 和 `null` 赋值给它 `let unusable: void = undefined;`
  - 具有 `never` 返回类型的函数永不返回。它也不返回 `undefined`。该函数没有正常完成，这意味着它可能会抛出异常或根本无法退出执行。


