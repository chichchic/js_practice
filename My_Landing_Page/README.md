# 실습 내용 정리

## 내가 배운것

1. e.target을 사용하면 클릭 이벤트에서 최상단의 부모만 반응하도록 할 수 있음

```javascript

element.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    concealElement(modalContainer);
  }
});

```

2. left navigation 만드는 방법

왼편에 left navigation을 숨겨둔 후 body 전체를 이동시키면 됨

3. transition은 애니매이션이 적용되는 곳에 해당 속성은 다른 클래스 만들어야한다.

transition의 경우 자동으로 반대 상황에 대한 animation이 적용되는데
애니메이션 속성을 가진곳에서 transition 속성을 줄 경우 반대 상황이 적용되지 않는다.

4. classList.toggle()을 통해서 class를 추가제거하는 이벤트를 쉽게 관리할 수 있음

## 의문점

1. modal transition 'conceal' / 'reveal' 와 같이 두개의 클래스 사용하는 방식이 최선일까?

처음에는 'coneal' class만 만들어 사용했는데 이경우 페이지를 처음 렌더링할 때 transition animation이 발생하는 문제가 생겼음
이를 해결하기 위해 'reveal' class를 만들고 modal 자체에는 coneal 과 동일한 css attribution을 주었다.

=> animation @keyframe과 display:none을 활용하는 방식을 통해 해결

하지만 사라질 때 자연스럽게 애니메이션이 들어가지 않음

2. e.stopPropagation()는 언제 사용해야하는건지 잘 모르겠음