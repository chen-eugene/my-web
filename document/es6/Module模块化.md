##### 1、`CommonJS` 模块和 `ES6` 模块对比
```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;

// ES6模块
import { stat, exists, readFile } from 'fs';
```
- `CommonJS` 整体加载 `fs` 模块（即加载fs的所有方法），生成一个对象`（_fs）`，然后再从这个对象上面读取3个方法。
称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
- `ES6` 实质是从fs模块加载3个方法，其他方法不加载。称为“编译时加载”或者静态加载，即 `ES6` 可以在编译时就完成模块加载，
效率要比 `CommonJS` 模块的加载方式高。当然，这也导致了没法引用 `ES6` 模块本身，因为它不是对象。
- 最大区别：
    - `CommonJS` 生成一个对象：CommonJS的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
    - `CommonJS` 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
    - `ES6` 编译期加载，不是对象

##### 2、`export` 命令
- `export` 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
    ```
    export 1    //报错
    //这里输出的是一个值(1)，没有与任何模块内部变量建立联系，所以直接报错。
    
    var m = 1;
    export m;   //报错
    //变量m在模块中作为一个变量存在，但是通过export导出m时，被导出的只有m的值（1），
    //所以同样不与内部变量产生联系，于是报错。
    
    export var m = 1;
    //这里是直接输出一个声明的变量，变量的值为1；
    ```

##### 3、`import` 命令
- `import` 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构
    ```
    // 报错
    import { 'f' + 'oo' } from 'my_module';
    
    // 报错
    let module = 'my_module';
    import { foo } from module;
    
    // 报错
    if (x === 1) {
        import { foo } from 'module1';
    } else {
        import { foo } from 'module2';
    }
    ```

- 整体导入
    ```
    import * as circle from './circle';
    
    console.log('圆面积：' + circle.area(4));
    console.log('圆周长：' + circle.circumference(14));
    ```

##### 4、`export default` 命令
- 指定默认输出，`import` 命令可以为该匿名函数指定任意名字
- `import` 加载模块时，`import` 命令后面，不使用大括号
- 一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次

##### 5、`ES6` 模块加载的实质
- `CommonJS` 模块输出的是一个值的拷贝，而 `ES6` 模块输出的是值的引用。
    - `CommonJS` 模块：输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
    - `ES6` 模块：遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。
    等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。
    因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
- `ES6` 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错
    ```
    // mod.js
    function C() {
      this.sum = 0;
      this.add = function () {
        this.sum += 1;
      };
      this.show = function () {
        console.log(this.sum);
      };
    }
    
    //输出的是一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。
    export let c = new C();
    ```

##### 6、循环加载
- [`CommonJS` 模块的循环加载](http://caibaojian.com/es6/module.html)：一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
- [`ES6` 模块的循环加载](http://caibaojian.com/es6/module.html)：ES6加载的变量，都是动态引用其所在的模块。只要引用存在，代码就能执行。









