# 실습 내용 정리

## 기존 프로젝트가 가지고 있는 문제점

1. 스크롤이 없는 화면(길이가 매우 긴 화면)의 경우 무한 스크롤이 작동하지 않는다.

## 내가 배운것

1. h 태그와 input 태그를 가운데 정렬 하기 위해서는 text-align: center를 사용하면 된다.
  (margin: 0 auto 는 작동하지 않는다. 이유는 display: block이 아니기때문. width를 계산할 수 없다.)

2. margin은 margin끼리 중복되서 계산되지 않는다...? => margin collapsing

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

5. html event
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