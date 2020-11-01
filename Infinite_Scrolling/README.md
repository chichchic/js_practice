# 실습 내용 정리



## 내가 배운것

1. h 태그와 input 태그를 가운데 정렬 하기 위해서는 text-align: center를 사용하면 된다.
  (margin: 0 auto 는 작동하지 않는다. 이유는 display: block이 아니기때문. width를 계산할 수 없다.)

2. margin은 margin끼리 중복되서 계산되지 않는다...? => margin collapsingx

> - 인접 형제 박스 간 상하 마진이 겹칠 때
> - 빈 요소의 상하 마진이 겹칠 때
> - 부모 박스와 첫 번째(마지막) 자식 박스의 상단(하단) 마진이 겹칠 때

중복된 마진을 사용하지 않도록 고려함으로써 원하지 않는 margin collapsing을 예방할 수 있다!

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing) | [참고 블로그](https://velog.io/@raram2/CSS-%EB%A7%88%EC%A7%84-%EC%83%81%EC%87%84Margin-collapsing-%EC%9B%90%EB%A6%AC-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4)

3. html5 태그 사용용도

접근성을 높이기 위해 ARIA(Accessible Rich Internet Applications)를 통해 정보를 보충하는데
html5에서는 많은 부분이 태그로 통합되었다.
관련해서 도서(Do it! HTML5 + CSS3 웹 표준의 정석)를 보고 정리한 내용을 따로 올려두었다.

4. 깃 커밋 규칙 공부하기

5. html 내부에서 js 파일과 바로 event 연결이 가능함
예시:
```html
<input
  type="text"
  class="header--input"
  placeholder="Filter posts..."
  onkeyup="filterCards(this.value)"
/>
```

[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)에서 사용할 수 있는 Event들을 내부 속성으로 사용할 수 있음
Event handler property로 문서에는 명시되어 있음

6. script 외부 파일은 header에 넣기보다 body의 최하단에서 두는것이 좋다.
  로딩부하, 자원 관리, 코드 가독성, 코드 재사용 등의 이점을 가질 수 있다.

7. indexOf vs includes
  두 method 모두 부분 문자열 검색을 위해 자주 사용된다.
  둘의 가장 큰 차이점은 은 검색 방식에 있다.
  indexOf는 [Strict Equality Comparison](https://www.ecma-international.org/ecma-262/#sec-strict-equality-comparison) 를, includes는 [SameValueZero](https://www.ecma-international.org/ecma-262/#sec-samevaluezero) 방식을 사용한다.

  [NaN].indexOf(NaN)의 경우 -1(false로 사용됨)를
  [NaN].includes(NaN)의 경우 true를 반환한다.

8. 스크롤 최하단에 위치해있는지 파악하는법
```javascript
const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
if(scrollTop + clientHeight <= scrollHeight) return true
else return false
```

9. 새로운 html element를 만들어 추가할 때는 innerHtml을 활용하면 직관성이 높아져 가독성이 좋아진다.

10. fetch
AJAX를 위해 항상 axios 모듈을 사용했으나, ecma2016부터 제공되는 fetch를 활용하면 추가적인 모듈 설치가 필요없다.
(단, IE는 제공하지 않는다...)

파라미터로 (url, init)을 사용한다.
return 값은 promise로 반환되며 response 객체를 담고있다.

```javascript
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${index}`
  );
  if(res.ok) {
    const data = await res.json();
    return data;
  }
  else
    return Promise.reject(`${res.status} Error: Can't get datas`)
}
```
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

11. IntersectionObserver를 사용할 때 threshold값을 통해 작동되는 시점을 설정 할 수 있다.

[참고 블로그](https://heropy.blog/2019/10/27/intersection-observer/)

12. 아직 원인은 불명확하지만 시작하자마자 window.scrollTo()를 사용할 경우 window.scrollY값은 변하지만
실제로 화면은 바뀌지 않는것을 확인해 볼 수 있다.

setTimeout을 활용해 문제를 해결했으나 이유는 찾지 못했다.

=> 문제의 원인은 브라우저는 reload시 이전 페이지의 스크롤 위치로 돌아가려는 경향이 있기때문이다.
이를 해결하기 위해서는 beforeunload 이벤트를 추가해주거나, setTimeout을 통해 조금의 시간격차를 주어야한다.(smooth를 사용해도 같은 효과를 얻을 수 있음)

[참고 글](https://stackoverflow.com/questions/19057731/scrolltop-on-page-reload-doesnt-work-possible-script-conflict)

## 기존 프로젝트가 가지고 있는 문제점

1. 스크롤이 없는 화면(길이가 매우 긴 화면)의 경우 무한 스크롤이 작동하지 않는다.
이에 대한 해결방식으로 옵저버를 이용해 현재 화면에 노출되어 있는지 확인하고자 했다.
하지만 옵저버가 노출되어 있는지 확인하고 이벤트를 발생 시켜줄 트리거를 어느 시점에 어떻게 발생시켜야할지 잘 모르겠다.

1번 아이디어
setInterval을 통해 수시로 확인하는 방식

스크롤을 내리지 않아도 매번 확인하기때문에 효율적이지 못한 방법이지만 한곳에서 관리할 수 있어서 관리하기 편리하다.

2번 아이디어
옵저버의 인터섹터 값이 달라진 순간과 데이터를 받아 온 후 두 상황에서 확인하는 방식

이 경우 보다 효율적으로 원할 때만 이벤트를 발생시킬 수 있지만 두곳에서 호출을 하는 방식으로
코드가 깔끔해지지 못한다는 단점이 있다.

3번 아이디어
첫 호출 이후 컨텐츠 div의 최소 높이를 100vh로 설정하여 이벤트 트리거 역할을 하는 loader가 화면 밖에 있도록 만들었다.
이를 통해 문제를 해결할 수 있었고, 스크롤을 내릴때만 추가적인 데이터를 받아온다는 UX를 유지시킬 수 있었다.



## 작업하면서 아쉬웠던 점

1. 나름 노력했지만 코드를 직관적으로 이해하기는 힘든것같았다.
흐름과 역할을 좀더 보기 쉽게 만들 수 있도록 노력해야겠다.



## 스터디 내용 정리

1. localStorage를 사용하면 탭이 닫힌 이후에도 데이터가 남아있도록 할 수 있다.
이를 활용하면 다양한 프로젝트를 할 수 있을 것 같다.

2. setTimeout을 사용하는 것은 좋지 못하다.
컴퓨터의 메모리를 계속 잡아먹는 함수가 존재하기 때문이다.

3. 이벤트 위임을 통해 내부에 있는 동일한 tag or class에 이벤트 리스너를 등록시킬 수 있다.
이러한 방식을 통해 작업할 경우 3가지 이점이 존재한다.

- 초기화가 단순해지고, 메모리가 절약된다
- 코드를 보다 간결하게 만들 수 있다.
- innerHTML이나 유사한 기능을 하는 스크립트 요소 덩어리를 더하거나 뺄 수 있어 DOM 수정이 쉬워진다.

[정리 글](https://ko.javascript.info/event-delegation)
