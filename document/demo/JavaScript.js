
//<editor-fold desc="工厂模式">

function createPerson(name, age, job){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");

// - 减少了创建多个相似对象时的重复代码
// - 没有解决对象识别问题（即怎么知道一个对象的类型）

//</editor-fold>

//<editor-fold desc="构造函数模式">
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){  // 每个对象实例都会创建一个函数对象
        alert(this.name);
    };
}

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");

// - 解决了对象识别问题
// - 每个对象的方法都会重新创造

//</editor-fold>

//<editor-fold desc="原型模式">
function Person(){}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

let person1 = new Person();
let person2 = new Person();

// hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中
// 只在给定属性存在于对象实例中时，才会返回 true
alert(person1.hasOwnProperty("name")); //false

person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person1.hasOwnProperty("name")); //true

alert(person2.name); //"Nicholas"——来自原型
alert(person2.hasOwnProperty("name")); //false

delete person1.name;
alert(person1.name); //"Nicholas"——来自原型
alert(person1.hasOwnProperty("name")); //false

// 简化写法
function Person(){}
Person.prototype = {
    constructor: Person, // 重写了默认的原型对象，constructor不在指向Person，所以要手动修改
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName: function () {
        alert(this.name)
    }
};

//</editor-fold>



