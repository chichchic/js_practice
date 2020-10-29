# 데이터 타입



##데이터 타입의 종류



- 기본형 - primitive type: 값을 그대로 할당, 불변성을 가진다.(상수 아님)
  1. number
  2. string
  3. boolean
  4. null
  5. undefined
  6. symbol
- 합성형 - Composite type: 값이 저장된 주소값을 할당(참조)
  1. object
     1. Array
     2. Function
     3. RegExp
     4.  Date
     5. Map, WeakMap
     6. Set, WeakSet
        중복되지 않는 값을 가지는 리스트
        Set의 경우 프로퍼티로 객체를 가질 경우 변수에 객체를 할당할 때와 같이 참조되며
        WeakSet의 경 프로퍼티로 객체를 가질 경우 객체 참조를 가지게 된다.
        (따라서, WeakSet의 경우 primitive type자료를 가질 수 없다.)

기본형과 합성형으로 나누어지는 것에는 다른점이 없으나 기본적으로 제공되는 객체는 더욱 다양하다.

[Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

##데이터 타입에 관한 배경 지식



###메모리와 데이터 

- js 는 메모리를 얼마씩 할당할까??  [백만개씩 배열에 넣었을 때 각 데이터 타입별 크기](https://www.mattzeunert.com/2016/07/24/javascript-array-object-sizes.html)
  정수, 실수 구분 x: 8byte



###식별자와 변수

- 변수: 변할 수 있는 무언가, 무언가란 데이터를 말한다.
- 식별자: 데이터를 식별하는 데 사용하는 이름, 즉 변수명



##변수 선언과 데이터 할당

**변수 선언**시 변수영역에 **식별자**와 값을 저장할 데이터영역의 **주소**를 저장한다.

이후, 변수에 **데이터를 할당**하면 해당 변수 영역에 할당되어 있는 **값의 주소**로 가 할당된 **데이터**를 저장한다.



변수와 데이터 영역을 분리하여 관리하는데

그 이유는

1. 데이터 변환을 자유롭게 할 수 있다.
2. 메모리를 더욱 효율적으로 관리할 수 있다.



데이터의 크기에 맞지 않게?? 항상??

언제 재 할당 되는걸까?

```javascript
var a;    //변수 선언
a = "abc" //데이터 할당
```



### call by value VS call by reference VS call by sharing

javascript에서는 함수에 값을 전달 할 때 새로 변수를 만든 후 전달받은 데이터의 데이터 영역 값을 복사한다.

따라서 새로 만들어진 변수에 새로운 값을 할당 할 경우 기존의 값은 변화가 없다.

하지만 새로 만들어진 변수에서 내부 값을 변경 할 경우 기존 값에도 영향을 받게 된다.

```javascript
//call by value
var a = 1;
var func = function(b) { // callee
  b = b + 1;
}
func(a); // caller
console.log(a); // 1

//call by reference
var a = {};
var func = function(b) { // callee
  b.a = 1;
}
func(a); // caller
console.log(a.a); // 1

//call by sharing
var a = {};
var func = function(b) { // callee
  b = 1;
}
func(a); // caller
console.log(a); // {}
```

[참고 블로그](https://perfectacle.github.io/2017/10/30/js-014-call-by-value-vs-call-by-reference/)



##기본형 데이터와 참조형 데이터



###불변값 

불변값과 상수는 명백히 다른 개념이다.

**변수 영역** 내부에 재할당이 불가능하다면 상수이다.

**데이터 영역**에 재할당이 불가능하다면 불변값이다.



불변값에는 숫자, 문자열, boolean, null, undefined, Symbol이 있다.

불변값을 할당받은 변수들은 새로운 값을 추가할 때 **새로운 데이터 영역에 값을 할당**한 후 변수 내부에 데이터값 주소를 변경시킨다.



불변값은 한번 만들어진 후에는, [가비지 컬렉팅](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)을 당하지 않는 한 변하지 않는다.

###가변값 

참조형 데이터들은 모두 가변값인가?

대부분이 가변값이다. 

**하지만** 설정에 따라서 변경 불가능한 경우도 있고, 아예 불변값으로 활용하는 방법도 있다.(후술)

참조형 데이터의 데이터영역에는 새로운 변수영역의 주소가 들어있다.

만약 기존 참조형 데이터에 새로운 값을 넣을 경우 데이터 영역의 값이 변하는 것이 아닌 새로운 데이터 영역에 값을 할당하게 된다.

즉, **데이터 영역의 값들은 모두 불변값**이며, 한번 할당되면 가비지 컬렉팅을 당하지 않는 한 변하지 않음을 알 수 있다.

###변수 복사 비교

js는 값을 복사할 경우 **변수 영역의 데이터 영역 주소값만을 복사**한다.



##불변 객체

함수형 프로그래밍, 디자인 패턴 등에서도 매우 중요한 기초가 되는 개념이다.



###불변 객체를 만드는 간단한 방법 

참조형 객체의 가변성을 없애기 위해

내부 프로퍼티를 변경할 필요가 있을 때 마다 재할당하거 자동으로 새로운 객체가 만들어지도록 하면 된다.

(spreead operation, Object.assign 을 통해 가능하다)

**Object.freeze**를 통해서도 가능한데 이 경우 내부의 값을 변경하려 할 때 무시된다.
하지만 객체 내부의 객체는 변경이 가능하다.(이를 막기 위해서는 재귀적으로 Object.freeze를 실행시키면 된다.)

허나 위 3가지을 이용하여 불변 객체를 만드는 방법은 번거롭고 성능적인 이슈가 있 큰 객체에서는 사용하지 않는것이 좋다.
큰 객체에는[immutable.js](https://immutable-js.github.io/immutable-js/)를 사용하는것이 좋다.



###얕은 복사와 깊은 복사

얕은복사란 바로 아래단계의 값만 복사하는 방법이고

깊은 복사란 내부의 모든 값들을 하나하 찾아 복사하는 방법이다.

재귀적인 얕은복사와 hasOwnProperty를 통해 프로토타입 체이닝을 뺀 깊은 복사를 할 수 있다.

(단, getter, setter같은 속성값의 경우 getOwnPropertyDescriptors를 사용해야한다.)

(JSON으로 변경한 후 객체로 변경하는 방식도 가능하다.)

[프로토타입 체이닝이란](https://velog.io/@sik2/JS-CoreJavaScript-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EC%B2%B4%EC%9D%B4%EB%8B%9DPrototype-Link-Prototype-Object)

[hasOwnProperty란](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

[속성값이란](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)



##undefined와 null

###undefined

1. 값을 대입하지 않은 변수
2. 객체 내부의 존재하지 않는 프로퍼티 접근
3. return문이 없거나 호출되지 않는 함수의 실행 결과
   ( 브라우저 콘솔에서 undefined 뜨는 이유 )

Array에 크기만을 할당할 경우 empty값이 나타나는데 이는 undefined는 empty와는 다르다.

empty의 경우 map, filter, reduce등의 매서드에서 순회되지 못한다.

empty의 경우 비어있긴 하나, 사용자가 명시적으로 공간을 부여한 것이며,

undefined의 경우 비어있는 요소에 접근하려 할 때 반환되는 값이다.

따라서 undefined를 직접할당하지 않는것이 좋다.



### null

비어있는 값을 나타내고자 할 때는 undefined가 아닌 null을 사용해야한다.

null에서 주의할 점은 typeof 를 사용할 경우 object로 나온다는 점이다.

따라서 ===를 사용해야한다.



```javascript
typeof null // object
typeof undefined // undefined
null === undefined // false
null == undefined // true
null === null // true
!null //true
isNaN(1 + null) //false
isNaN(1 + undefined) // true
```



범용함수!!