# 실습 내용 정리

## 내가 배운것

1. 클릭 이벤트에서 최상단의 부모만 반응하도록 하는 방법

```javascript

element.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    concealElement(modalContainer);
  }
});

```

2. left navigation 만드는 방법

왼편에 left navigation을 숨겨둔 후 body 전체를 이동시키면 됨

1. transition은 애니매이션이 적용되는 곳에 해당 속성은 다른 클래스에 만들어야한다.

transition의 경우 자동으로 반대 상황에 대한 animation이 적용되는데
애니메이션 속성을 가진곳에서 transition 속성을 줄 경우 반대 상황이 적용되지 않는다.
