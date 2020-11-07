# 실습 내용 정리



## 내가 배운것

1. WebFont.load를 통해서 webfont의 상태를 trigger로 사용할 수 있음

[참고 문서](https://github.com/typekit/webfontloader)

2. window.devicePixelRatio를 통해 HiDPI/Retina 디스플레이와 표준 디스플레이 랜더링에 유동적으로 대처할 수 있다.

[MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/devicePixelRatio)

3. lineCap을 통해 canvas에서 선의 끝부분 모양을 변경할 수 있음

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)

4. getImageData를 통해 canvas에 그려진 그림을 pixel좌표 값을 얻어올 수 있음

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)

5. mouel을 사용할 때 cors오류를 해결하는 법과 원인

[참고 블로그](https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu)



## work-flow

1. App의 resize method를 이용해 display 설정
2. Visual을 통해 Text를 생성, setText를통해 원하는 text canvas에 그리기(fillText API활용)
3. Text의 dotPos method를 이용해 canvas에 그려진 text를 점으로 변경함(getImageData)
4. Text의 getOutline을 통해 세로선으로 text를 그렸을 때 최고 y값, 최소 y값을 기록
5. 선의 끝값들과 BounceString을 통해 세로선 에니메이션을 그림
(매 프레임마다 BounceString의 animate method를 호출함)



## 스터디 내용 정리