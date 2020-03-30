##### 1. `typeof`操作符：
- `undefined`——如果这个值未定义;    
- `Null`——只有一个值的数据类型，`null`
    - `null`：表示一个空对象指针，而这也正是使用 `typeof` 操作符检测 `null` 值时会返回`"object"`的原因
        ```
        var car = null;  
        alert(typeof car); // "object"
        ```
    - `undefined` 值是派生自 `null` 值的
       ```
       alert(null == undefined); //true 
       // 申明保存对象的变量时，就应该明确地让该变量初始值为 `null`,
       // 有助于进一步区分 null 和 undefined
       ```
- `boolean`——如果这个值是布尔值(区分大小写，True和False都不是Boolean值);
    - true, false
    - 任何非空字符串，""空字符串
    - 任何非零数字值，0和NaN
    - 任何对象，null
    - n/a，undefined
- `string`——如果这个值是字符串;
- `number`——如果这个值是数值;
- `object`——如果这个值是对象或 null(null 值表 示一个空对象指针，所以返回`object`);
    - `constructor`：构造函数
    - `hasOwnProperty`：用于检查给定的属性在当前对象实例中(而不是在实例 的原型中)是否存在。
    - `isPrototypeOf(object)`：检查是否为传入对象的原型
    - `propertyIsEnumerable(propertyName)`：检查给定的属性是否能够使用`for-in`语句来枚举
    - `toLocaleString()`：返回对象的字符串表示，该字符串与执行环境的地区对应
    - `toString()`：返回对象的字符串表示
    - `valueOf()`：返回对象的字符串、数值或布尔值表示
- `function`——如果这个值是函数。
    - `arguments`：函数参数数组
    - 没有函数重载
    - 命名的参数提供了便利，但是不是必需的
        ```
        function howManyArgs() { alert(arguments.length);}
        howManyArgs("string", 45); //2 
        howManyArgs(); //0 
        howManyArgs(12); //1
        ```

##### 2、变量
- 动态属性:
    1. 对于引用类型，可以动态添加和修改或者删除其属性和方法
        ```
        var person = new Object(); 
        person.name = "Nicholas"; 
        alert(person.name); //"Nicholas"
        ```
    2. 对于基本类型，则不可以
        ```
        var name = "Nicholas";
        name.age = 27;
        alert(name.age); //undefined
        ```
- 变量的赋值：
    1. 基本类型的赋值，会在变量对象上创建一个新值，然后把该值复制 到为新变量分配的位置上
        ```
        var num1 = 5; 
        var num2 = num1;
        //num2 中的 5 与 num1 中的 5 是完全独立的，该值只是 num1 中 5 的一个副本。此后，这两个变量可以参与任 何操作而不会相互影响。
        ```
    2. 引用类型的赋值：拷贝的是对象的指针，所以指向的是同一个对象
    3. `typeof`用于检测基本类型，`instanceof`用于检测引用类型
    
##### 3、执行环境及作用域
- 每个执行环境都有一个与之关联的 _**变量对象**_，环境中定义的所有变量和函数都保存在这个对象中
- 全局执行环境为window对象，因此所有的全局变量和函数都是作为`window`对象的属性和方法创建的
- 延长作用域链：
    - `try-catch`：创建一个新的变量对象，并把它添加到作用域链的前端
    - `with`：会将指定指定的对象添加到作用域链中
        ```
        function buildUrl() {
            var qs = "?debug=true";
            with(location){
                var url = href + qs;
            }
            return url; 
        }
        
        // with 语句接收的是 location 对象，因此其变量对象中就包含了 location 对象的所有属 性和方法，
        // 而这个变量对象被添加到了作用域链的前端，
        // with 语句内部，则定义了一个名为 url 的变量，因而 url 就成了函数执行环境的一 部分，所以可以作为函数的值被返回
        ```
- 没有块级作用域
    ```
    if (true) {
        var color = "blue";
    }
    alert(color); //"blue"
    
    // if 语句中的变量声明会将变量添加到当前的执行环境(在这里是 全局环境)中
    ```
   
- `var` 声明的变量会自动被添加到最接近的环境中，没有使用 var 声明，该变量会自 动被添加到全局环境
- 如果局部环境中存在着同名标识符，就不会使用位于父环境中的标识符

##### 5、引用类型
- `Object`
    - 通过对象字面量定义对象时，不会调用`Object`构造函数
- `Array`
    - `join`：以不同的分隔符输出字符串
        ```
        var colors = ["red", "green", "blue"]; 
        alert(colors.join());  //red,green,blue 
        alert(colors.join(""));  //redgreenblue 
        alert(colors.join("||"));  //red||green||blue
        ```    
    - `push`、`pop`：入栈和出栈
    - `shift`、`shift`：入队列和出队列
    - `unshift`：在数组前端添加
    - `sort`、`reverse`：升序排序和降序排序
    - `concat`：平铺数据得到一个新的数组，原来的数组保持不变
    - `slice`：截取数组得到一个新的数组，原来的数组保持不变
    - `splice`
        - 删除：删除任意数量的项，指定2个参数：要删除的第一项的位置和要删除的项数。 例如：`splice(0,2)`会删除数组中的前两项。
        - 插入：插入任意数量的项，指定3个参数：起始位置、0(要删除的项数) 和要插入的项。例如：`splice(2,0,"red","green")`会从当前数组的位置 2 开始插入字符串"red"和"green"
        - 替换：替换任意数量的项，指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。例如：`splice (2,1,"red","green")`会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串 "red"和"green"。
        ```
        var colors = ["red", "green", "blue"];
        var removed = colors.splice(0,1);                    // 删除第一项
        alert(colors); // green,blue 
        alert(removed); // red，返回的数组中只包含一项
        
        removed = colors.splice(1, 0, "yellow", "orange");  // 从位置 1 开始插入两项 
        alert(colors); // green,yellow,orange,blue           
        alert(removed); // 返回的是一个空数组
        
        removed = colors.splice(1, 1, "red", "purple");      // 插入两项，删除一项
        alert(colors); // green,red,purple,orange,blue 
        alert(removed); // yellow，返回的数组中只包含一项
        ```
    - `indexOf`、`lastIndexOf`：从头和尾开始查找
    - 迭代：
        - `every`：如果该函数对每一项都返回 `true`，则返回 `true`
        - `filter`：返回该函数会返回 `true` 的项组成的数组
        - `forEach`：循环遍历
        - `map`：变换
        - `some`：如果该函数对任一项返回 `true`，则返回 `true`
    - `reduce`、`reduceRight`：迭 12 代数组的所有项，然后构建一个最终返回的值，一个从前，一个从后.
        给 `reduce()`和 `reduceRight()`的函数接收 4 个参数:前一个值、当前值、项的索引和数组对象
        ```
        var values = [1,2,3,4,5];
        var sum = values.reduce(function(prev, cur, index, array){
            return prev + cur;
        });
        alert(sum); //15
        ```
- `Function`
    - 没有函数重载，会覆盖掉之前的共同名函数
    - 函数声明会存在函数声明提升，而函数表达式则不会
        ```
        //函数声明：解析器就已经通过一个名为函数声明提升的过程，
        //读取并将函数声明添加到执行环境中
        alert(sum(10,10)); 
        function sum(num1, num2){
            return num1 + num2;
        }
        
        // 函数表达式：没有函数声明提升
        alert(sum(10,10));
        var sum = function(num1, num2){
            return num1 + num2;
        };
        ```
    - 内部属性
        - `arguments`：数组对象，保存了函数的所有参数
        - `this`：指向函数的执行环境
    - 函数属性和方法
        - `length`：参数的个数
        - `prototype`：原型对象
        - `apply()`：修改函数`this`属性的指向，接收了两个参数：1、运行函数的作用域；
           2、参数数组（Array的实例或者arguments对象）
        - `call()`：和apply作用一样，不同在于参数传递：1、运行函数的作用域；2、将参数
           逐个传递
        - `bind()`：修改函数的执行作用域，会返回一个新的函数实例，接收一个参数
        
- 基本包装类型：`String`、`Boolean`、`Number`
    - 引用类型和基本包装类型的区别：
        ```
        // 使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。
        // 而自动创建的基本包装类型的对象，则只存在于一 行代码的执行瞬间，然后立即被销毁。
        // 这意味着我们不能在运行时为基本类型值添加属性和方法
        var s1 = "some text";
        s1.color = "red"; 
        alert(s1.color); //undefined
        ```
    - 对基本包装类型的实例调用 `typeof` 会返回`object`，而且所有基本包装类型的对象都会被转换为布尔值 `true`。
        
    
