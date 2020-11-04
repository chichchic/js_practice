# 실행 컨텍스트

![Screen Shot 2020-11-04 at 4.36.33 PM](/Users/pch/Library/Application Support/typora-user-images/Screen Shot 2020-11-04 at 4.36.33 PM.png)

실행 컨텍스트란 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 javascript의 핵심원리이다.

실행 가능한 코드를 형상화하고 구분하는 추상적인 개념이다.



코드를 실행하기 위해 필요한 정보

1. 변수: 전역 변수, 지역 변수, 매개변수, 객체의 프로퍼티
2. 함수 선언
3. 변수의 유효 범위(Scope)
4. this



순서는 Creation Phase, Execution Phase로 나뉜다.



**실행 컨텍스트의 3가지 객체**

1. Variable object
   변수, 매개변수(parameter), 인수 정보(arguments) ,함수선언을 가지고 있는 객체

2. Scope chain
   변수의 유효 범위를 가지고 잇는 객체
   일종의 리스트로 전역 개체와 중첩된 함수의 스코프의 레퍼런스를 차례로 저장하고 있다.
   *객체 프로퍼티가 아닌 식별자(변수)를 검색하는 매커니즘이다.*
   *프로퍼티를 검색하는 메커니즘은 프로토타입 체인이다.*

   스코프 체인을 통해 렉시컬 스코프(변수 단어장)를 파악한다.

   다른 값과 연관을 가지고 있을 때 property 라고 부릅니다.(예: length)

3. thisValue
   this의 값을 가지고 있는 개체



**실행 컨텍스트의 생성 과정**

1. 전역 코드에 진입

   전역 개체를 생성한 후 전역 실행 컨텍스트를 생성한 후 실행 컨텍스트 스택에 쌓인다.

2. 실행 컨텍스트 처리

   실행 순서

   - 스코프 체인의 생성과 초기화

   - Variavle Instantiation(변수 객체화) 실행

     Variable Object에 프로퍼티와 값을 추가하는것을 의미한다.
     실행 순서

     1. Function Code인 경우 parameter가 VO의 프로퍼티로, argument가 값으로 설정된다.

     2. 대상 코드내의 함수 선언(함수 호이스팅)

        [[Scopes]] 프로퍼티를 가지게 된다. 자신의 실행 환경과 자신을 포함하는 외부 함수의 실행환경과 전역 객체를 가리킨다.

     3. 대상 코드내의 변수 선언을 대상으로 값이 undefined로 설정된다.(변수 호이스팅)

        변수는 선언단계 - 초기화 단계 - 할당 단계로 이루어진다. 이 단계에서는 선언만이 이루어진다. 하지만 var 키워드의 경우 선언단계와 초기화 단계가 한번에 이루어진다.

   - this value 결정

   함수 호출 패턴에 의해 결정된다.

   > 함수 : this는 전역(window)를 가르킨다.
   >
   > 메소드: 소유하는 객체를 가르킨다.(Class 동일)
   >
   > 생성자: 새로 만들어지는 객체를 가르킨다.(new를 사용할경우 생성자로 처리한다.)
   >
   > 간접: call 혹은 apply를 사용할 경우 첫번째 인자를 가르킨다. 함수 실행에서 다른 객체를 this가 가르키길 원할 때 사용된다.
   >
   > ArrowFunction: lexical this를 가르킨다.(상위 환경의 this를 계승한다.)

3. 전역 코드의 실행

코드를 Top down으로 실행한다.

전역 코드의 함수가 실행되면 새로운 함수 실행 컨텍스트가 생성되며 2번 실행 컨텍스트 처리과정이 발생한다.

## Variable Environment

1. 전역 컨텍스트의 경우
   유일하며 최상위에 위치한다. 전역 변수와 전역 함수 등을 포함하는 전역 객체(Global Object)를 가르킨다.
   - BOM(브라우저에 대한 내용을 가진 객체, 뒤로가기, 북마크 등) - history / loacation사용
   - DOM(문서에 대한 모든 내용을 담고 있는 객체) - document 사용
   - Built-in object(내장 객체)
2. 함수 컨텍스트의 경우
   활성 객체(Activation Object)를 가츸키며 매개변수와 인수들의 정보를 배열의 형태로 담로 있는 arguments object가 추가된다.

## LexicalEnvironment

identifier-variable mapping되는 곳이다.

변수와 해당 변수에 대한 대입된 값이 매핑되는 곳이라고 볼 수 있다.(매핑만 됨)

Lexical Environment는 3가지 일을 한다.

1. Environment Records

2. Reference to the outer environment

   외부 lexical 환경으로 접근할 수 있음을 의미한다. 현재의 lexical environment에서 변수를 찾지 못했을 경우 외부에서 찾아볼수 있음을 의미한다.

3. This binding

   this의 값이 여기서 결정된다.



Lexical Environment와 Variable Environment의 차이점은 전자가 함수 선언과 변수의 바인딩을 저장하고 후자는 변수 var만 저장한다.

### environmentRecord와 호이스팅

**environmentRecord**란 lexical environment 안에 함수와 변수를 기록한다.



**호이스팅**이란 var선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성을 말한다.

let, const를 포함한 모든 선언을 호이스팅한다.

변수 선언에는 기본적으로 const를 사용하고, 재할당이 필요한 경우에 한정해 let을 사용하는것이 좋다.

### 스코프, 스코프 체인, outerEnvironmentRefernce

스코프: 변수가 참조될 수 있는 범위

스코프 체인: Lexical Environment를 통해 변수를 찾아보고 없다면 외부 Environment를 참조하여 찾아보는 식으로 스코프 체인이 일어난다. outer가 null이 될때 탐색을 멈춘다.

## this

```js
var add = function(a,b){} // 함수 표현식 => 함수 호이스팅 x
//Arrow function 은 오직 익명함수(함수 표현식)이므로 호이스팅이 일어나지 않는다.
function add(a,b){} // 함수 선언식 => 함수 호이스팅 발생
```

메소드, prototype, 생성자, addEventListener의 콜백 함수를 선언할 때는 arrow function을 사용하면 안된다.



## 참고 사이트

[실행 컨텍스트란 & 생성 과정](https://poiemaweb.com/js-execution-context)

[LexicalEnvironment & 호이스팅](https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-Hoisting-The-Execution-Context-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-6bjsmmlmgy)

[Closure](https://velog.io/@paulkim/e)

[this와 arrow function](https://kim-solshar.tistory.com/57)





## 문제

```js
var name = 'global var';

function home() {
  var homevar = 'homevar';
  for (var i = 0; i < 100; i++) {}
  console.log(i);
}
home();
```

```js
let foo = 1;
{
  console.log(foo);
  let foo=2;
}
```

```js
var a = 10; 
function foo(){
  console.log(a);
};
function bar(){
  var a = 20; 
  foo();
};
bar(); 
```

