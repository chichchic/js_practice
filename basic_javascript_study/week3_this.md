# this

대부분의 객체지향 언어에서 this는 클래스로 생성한 인스턴스 객체를 의미한다. 

하지만  javascript에서의 this는 어디서든 사용할 수 있다. 

상황에 따라 this가 바라보는 대상이 달라진다. 

this는 함수와 메서드를 구분하는 유일한 기능이 this이다.



## 상황에 따라 달라지는 this

this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할 때 생성되므로 바꿔 말하면 **this는 함수를 호출할 때** 결정된다. 따라서, 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라진다.



### 전역공간에서의 this

전역공간에서 this는 전역 객체를 가리킨다. 전역 컨텍스트를 생성하는 주체가 전역 객체이기 때문이다.

(전역 객체는 자바스크립트 런타임 환경에 따라 다른 이름과 정보를 가지고 있다. 브라우저 환경에서 전역객체는 window, Node.js 환경에서는 global이다.)

**브라우저 환경에서 globalThis로 사용하도록 하기로 했다**

전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다. **자바스크립트의 모든 변수는 Lexical Environment의 프로퍼티**로 동작한다. 

```javascript
var a = 1;
console.log(a); // 1
console.log(window.a) // 1
console.log(this.a) // 1
```



따라서 전역 공간에서는 변수를 선언하는 대신 window의 프로퍼팅에 직접 할당하더라도 결과적으로 똑같이 동작한다.

하지만, 삭제 명령에서는 다른 결과가 나온다.

```javascript
var a = 1;
delete a; // false
var b = 1;
delete window.b // false

window.c = 1;
delete c; //true
window.d = 1;
delete
```

전역으로 선언할 경우 전역객체 프로퍼티에 자동으로 configurable속성이 false로 정의되어 있기 때문에 수정이나 변경이 불가능하다.
(정확히는 [Object.defineProperty()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)을 통해 생성된 프로퍼티들은 configurable값이 false로 설정된다.)



### 메서드로서 호출할 때  메서드 내부에서의 this

함수와 메서드 사이의 유일한 차이는 **독립성**이다. 함수는 그 자체로 독립적인 기능을 하지만, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다.



매서드로 호출할경우 this는 **호출한 주체**를 가르킨다.

(매서드와 함수를 구분하는 가장 좋은 방법은 함수앞에 점(.) 또는 대괄호 표기법의 유무이다.)



###함수로서 호출할 때  함수 내부에서의 this

1. 함수 내부에서의 this는 전역객체를 가리킨다. 호출의 주체를 명시하지 않았기 때문이다.

2. 매서드의 내부함수에서의 this또한 함수로서 호출했는지 메서드로서 호출했는지를 파악하므로서 this가 무엇을 가르키는지 알 수 있다.

3. 화살표 함수를 사용할 경우 this바인딩 과정 자체가 빠지게된다.(함수 내부에 this가 아예 없다)  따라서 상위 스코프의 this를 그대로 활용할 수 있게된다.



요약: 가장 중요한 것은 누가 함수를 호출했는가를 파악하는것이다. 
호출의 주체가 없을 경우(함수의 경우)는 무조건 전역객체, 호출의 주체가 있을 경우(메서드의 경우)는 무조건 호출한 주체를 가르킨다.



### 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수의 제어권을 가지는 함수가 콜백 함수에서의 this를 무엇으로 할지 결정한다. 특별히 정의하지 않을 경우 기본 함수와 같이 this는 전역객체를 바라보게 된다.



### 생성자 함수 내부에서의 this

생성자 함수 내부에서의 this는 새로 만들 구체적인 인스턴스 자신이 된다.

```javascript
let Cat = function(name, age) {
	this.bark = '야옹';
  this.name = name;
  this.age = age;
}

var nabi = new Cat('nabi', 5);
console.log(nabi.name) // 'nabi'
console.log(nabi.age) // 5
```





## 명시적으로 this를 바인딩하는 방법

this에 별도의 대상을 바인딩하는 방법

1. call / apply 메서드

   ```javascript
   Function.prototype.call(thisArg, arg1, arg2 ....) // thisArg가 호출의 주체(this)가 된다.
   Function.prototype.apply(thisArg, [argsArray]) // thisArg가 호출의 주체(this)가 된다.
   
   // 둘의 차이는 함수의 인자를 인자로 받느냐, 배열로 받느냐의 차이 뿐이다.
   ```

2. call / apply 메서드의 활용
   1. 유사배열객체(프로퍼티의 키 값이 0 또는 양의 정수이며 length 프로퍼티값이 0 또는 양의 정수인 경우)는 call/apply를 통해 Array.prototype의 메서드들을 사용할 수 있다.
      (함수 내부에 존재하는 arguments 객체, Node선택자로 선택한 결과인 NodeList도 유사배열객체이므로 slice를 통해 얕은복사를 해 배열로 전환해 사용할 수 있다.)
      - 유사배열의 값들을 순회하는 함수로 Array.from 메서드를 사용할 수 있다.
   2. 생성자 내부에서 다른 생성자를 호출
   3. 여러 인수를 묶어 하나의 배열로 전달(spread operator(...)와 동일한 역할로 사용)

3. bind메서드

함수에 this를 미리 적용하는 것과 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닌다.

bind를 사용할 경우 함수의 이름을 호출할 경우 원래 함수 이름에 bound가 붙은 형태로 설정된다. 이를 통해 원본 함수를 추적하기 더욱 용이해진다.

```javascript
var func = function(a, b, c, d) {
  console.log(this, a, b, c, d)
}

var bindFunc1 = func.bind({x: 1});
bindFunc1(5, 6, 7, 8) // {x: 1} 5 6 7 8

var bindFunc2 = func.bind({x: 1}, 4, 5);
bindFunc2(6, 7) // {x: 1} 4 5 6 7
bindFunc2(8, 9) // {x: 1} 8 9 6 7

console.log(func.name) // func
console.log(bindFunc.name) // bound func
```

4. 일부 콜백함수는 thisArg를 인자로 받는 경우가 있다.
   - Array.prototype.forEach
   - Array.prototype.map
   - Array.prototype.filter
   - Array.prototype.some
   - Array.prototype.every
   - Array.prototype.find
   - Array.prototype.findIndex
   - Array.prototype.flatMap
   - Array.prototype.from
   - Set.prototype.forEach
   - Map.prototype.forEach



# 문제

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

console.log(shape.diameter())
console.log(shape.perimeter())
```



```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
```

