# 콜백함수

콜백함수란 다른 코드의 인자로 넘겨주는 함수이다. 콜백함수는 다른 함수에게 자신의 제어권을 넘겨주게된다.

webworker: background 연산을 처리해주는 API

### this

콜백함수도 함수이기때문에 기본적으로 this가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.

```javascript
Array.prototype.map = function(callback, thisArg) {
	var mappedArr = [];
  for(var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
}
```



### 콜백 함수는 함수다

```javascript
var obj = {
  vals: [1,2,3];
  logValues: function(v, i) {
    console.log(this, v, i)
  }
}

obj.logValues(1, 2); // {vals: [1, 2, 3], logValues: f} 1 2
[4, 5, 6].forEach(obj.logValues); // Window{..} 4 0
																	// Window{..} 5 0
																	// Window{..} 6 0
```

매서드 내부에 있는 함수를 콜백함수로 넣어주게될 경우 함수를 가지고 있는 객체(예제의 obj)와의 연결이 끊어지게 된다. 따라서, 콜백 함수의 주체는 전역객체가 된다.



### 콜백 함수 내부의 this에 다른 값 바인딩하기

```javascriptjavascript
var obj1 = {
  name: 'obj1'
  func: function() {
   	var self = this;
    return function() {
      console.log(self.name)
    }
  }
}

var callback = obj1.func();
setTimeout(callback, 1000);
```

실제로 this를 사용하지도 않을 뿐더러 번거러운 방식. (추천 x)

```javascriptjavascript
var obj1 = {
	name: 'obj1';
	func: function() {
		console.log(this.name);
	}
}

setTImeout(obj1.func.bind(obj1), 1000);

var obj2 = {name: 'obj2'}
setTimeout(obj1.func.bind(obj2), 1500);
```

bind 함수를 활용하여 this 값을 변경시켜주는 방식.



### 콜백 지옥과 비동기 제어

콜백 지옥 탈출법

1. promise

```javascript
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function (){
        var newName = preName ? (preName + ',' + name) : name;
        console.log(newName);
        resolve(newName);
      }, 500)
    })
  }
};
addCoffee('에스프레소')()
	.then(addCoffee('아메리카노'))
	.then(addCoffee('카페모카'))
```

2. Generator

```javascript
var addCoffee = function(prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ', ' + name : name); // 이 부분때문에 동적이지 않음
  }, 500);
};
var coffeeGenerator = function* () {
  var espresso = yield addCoffee('', '에스프레소');
  console.log(espresso);
  var americano = yield addCoffee(espresso, '아메리카노');
}

var coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```

3. async/await

```javascript
var addCoffee = function (name) {
    return new Promise(function (resolve) {
      setTimeout(function (){
        resolve(newName);
      }, 500)
    })
  }

var coffeeMaker = async function() {
  var coffeeList = '';
  var _addCoffee = async function(name) {
    coffeeList += (coffeeList ? ',' : '') + await addCoffee(name);
  }
  await _addCoffee('에스프레소')
  console.log(coffeeList)
  await _addCoffee('아메리카노')
  console.log(coffeeList)
  await _addCoffee('카페모카')
  console.log(coffeeList)
  await _addCoffee('카페라떼')
  console.log(coffeeList)
}

coffeeMaker();
```



```javascript
function getDrink() {
    return new Promise((resolve, reject) => {
        resolve('orange juice')
    })
}

async function fun() {
    let drinks = await getDrink();
    console.log(drinks) // orange juice
}

fun()
console.log('=======finish======')
```

```javascript
function job() {
    return new Promise(function(resolve, reject) {
        reject();
    });
}

let promise = job();

promise

.then(function() {
    console.log('Success 1');
})

.then(function() {
    console.log('Success 2');
})

.then(function() {
    console.log('Success 3');
})

.catch(function() {
    console.log('Error 1');
})

.then(function() {
    console.log('Success 4');
```

```javascript
function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise = job(true);

promise

.then(function(data) {
    console.log(data);

    return job(true);
})

.then(function(data) {
    if (data !== 'victory') {
        throw 'Defeat';
    }

    return job(true);
})

.then(function(data) {
    console.log(data);
})

.catch(function(error) {
    console.log(error);

    return job(false);
})

.then(function(data) {
    console.log(data);

    return job(true);
})

.catch(function(error) {
    console.log(error);

    return 'Error caught';
})

.then(function(data) {
    console.log(data);

    return new Error('test');
})

.then(function(data) {
    console.log('Success:', data.message);
})

.catch(function(data) {
    console.log('Error:', data.message);
});
```

1) =======finish======, orange juice

2) Error1, Success 4

3) sucess, Defeat, error, Error caught, Success: test