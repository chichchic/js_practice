# html5



## 태그 정리



### meta 태그

meta 태그를 이용해 문서에 대한 간단한 설명을 지정할 수 있다.



**viewport 설정**

PC화면과 모바일 화면의 픽셀 표현 방법이 다르기 때문에 모바일 기기에서는 화면이 다르게 보일 수 있다.

뷰표트를 활용하여 접속한 기기 화면에 맞추어 확대하거나 축소해 표시할 수 있습니다.

|     속성      |      사용 가능값      |     기본 값      |
| :-----------: | :-------------------: | :--------------: |
|     width     | device-width \| 크기  | 브라우저 기본 값 |
|    height     | device-height \| 크기 | 브라우저 기본 값 |
| user-scalable |       yes or no       |       yes        |
| initial-scale |        1 ~ 10         |        1         |
| minimum-scale |        0 ~ 10         |       0.25       |
| maximum-scale |        0 ~ 10         |       1.6        |



 사용 예:

``` html
<meta charset="utf-8">
<meta name = "description" content="짧은 설명">
<meta name="viewport" content="<속성1>, <속석2>, ..."
```

참고 링크 : [구글 검색 엔진에서 이해할 수 있는 meta 태그](https://support.google.com/webmasters/answer/79812?jl=ko)









### hr 태그

<hr>

위와 같이 수평 줄을 넣어주는 태그이다.



### blockquote / q 태그

인용문을 사용할 때 사용하는 태그이다.

blockquote의 경우 블록 레벨 태그로 줄이 바뀌어 나타나고

q의 경우 인라인 레벨 태그이기때문에 줄바꿈 없이 인용내용에 따옴표를 붙여 표시한다.

 사용 예:

<blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
    <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
</blockquote>



<q>this is quote</q>

### pre 태그



태그 안에 적혀있는 그대로를 보여주기 위해서 사용

접근성을 높이기 위해 figure과 figcaption을 조합해서 사용하는것이 바람직함

사용 예:

<figure role="img" aria-labelledby="cow-caption">
  <pre>
  _______________________
< 나는 이 분야의 전문가다. >
  -----------------------
         \   ^__^ 
          \  (oo)\_______
             (__)\       )\/\
                 ||----w |
                 ||     ||
  </pre>
  <figcaption id="cow-caption">
    소 한 마리가 "나는 이 분야의 전문가다"라고 말하고 있습니다. 소는 미리 서식을 적용한 텍스트로 그려져있습니다.
  </figcaption>
</figure>



### strong / b 태그

굵게 표시하고 싶은 텍스트에 사용합니다.

strong의 경우 강조하기 위해서 사용하는 태그이며, b의 경우 단순히 굵게 표시하기 위해서 사용됩니다.



### em / i 태그

비스듬히 표시하고 싶은 텍스트에 사용합니다.

em의 경우 강조하기 위해서 사용하는 태그이며, i의 경우 단순히 비스듬히 표시하기 위해서 사용됩니다.



### mark 태그

형광펜을 그은 듯한 효과

사용 예: 

<mark>Highlight this text</mark>

### ruby 태그

동아시아 국가들의 글자들에 주석을 함께 표기하기 위한 용도로 사용

사용 예:

<ruby>
明日 <rp>(</rp><rt>Ashita</rt><rp>)</rp>
</ruby>



### kbd 태그

키보드 입력, 음성 입력 등 임의 장치를 사용한 사용자의 입력을 나타냄

사용 예:

<p>Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.</p>



### small 태그

부가 정보처럼 작게 표시해도 되는 텍스트

사용 예:

<p>This is the first sentence. 
 <small>This whole sentence is in small letters.</small>
</p>



### sub / sup 태그

아래첨자 위첨자

사용 예:

<p>Almost every developer's favorite molecule is
C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>, also known as "caffeine."</p>

<p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>



### abbr 태그

약자 표시, 마우스 커서를 올리면 툴팁으로 표기된다.



### code 태그

<p>함수 <code>selectAll()</code>는 입력 필드의 모든 텍스트를 선택하므로,
사용자가 복사 혹은 삭제를 손쉽게 할 수 있습니다.</p>



짧은 코드조각을 나타내는 태그.

보통 한줄만 사용하며 여러줄을 사용해야 할 경우 pre를 사용한다.



### s 태그

취소선



### u 태그

밑줄



### a태그

다른 문서 / 사이트로 연결하기 위해 사용되는 태그

속성: 

- target: 링크한 내용이 표시될 위치 지정 (_blank: 새창, _self: 현재 창 - 기본값 , _parent: 부모 창 , _top: 최상위 부모 창)



###map, area 태그

이미지 링크를 사용할 때 이미지 내부에서 위치별로 다른 링크로 연결하기 위해서 사용하는 태그

사용 예:

``` html
<map name="infographic">
    <area shape="poly" coords="130,147,200,107,254,219,130,228"
          href="https://developer.mozilla.org/docs/Web/HTML"
          target="_blank" alt="HTML" />
    <area shape="poly" coords="130,147,130,228,6,219,59,107"
          href="https://developer.mozilla.org/docs/Web/CSS"
          target="_blank" alt="CSS" />
    <area shape="poly" coords="130,147,200,107,130,4,59,107"
          href="https://developer.mozilla.org/docs/Web/JavaScript"
          target="_blank" alt="JavaScript" />
</map>

<img usemap="#infographic" src="" alt="MDN infographic" />
```



### form 태그

속성:

- method: 사용자 입력 값을 서버에 어떤 방식(get, post)으로 넘겨줄 지 지정
- id: 한 문서에 여러개의 form이 있을경우 구분하기 위해 사용
- action: form 태그안의 내용을 처리해 줄 서버상의 프로그램을 지정
- target: action 태그에서 지정한 스크립트 파일을 현재 창이 아닌 다른 위치에 열도록 지정합니다.



### fieldset 태그

form 속에서 그룹을 만드는데 사용하는 태그

legend 태그를 통해 제목을 지정할 수 있습니다.

사용 예:

<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>
      </fieldset>
</form>



### select 태그

드롭다운을 만드는데 사용되는 태그

사용 예:

<label for="pet-select">Choose a pet:</label>

<select name="pets" id="pet-select">
  	<optgroup label="my-favorit">
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
  </optgroup>
  	<optgroup label="my-favorit">
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
  </optgroup>
</select>

```html
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
    <option value="Chocolate">
    <option value="Coconut">
    <option value="Mint">
    <option value="Strawberry">
    <option value="Vanilla">
</datalist>
```

위와같이 datalist와 input을 활용하는 방식도 있음



### output태그

다른 형식으로 보여주지는 않지만, 브라우저가 계산의 결과값임을 정확하게 인식할 수 있도록 도와주는 태그

사용 예:

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="b" name="b" value="50" /> +
  <input type="number" id="a" name="a" value="10" /> =
  <output name="result" for="a b">60</output>
</form>
```



### progress태그

진행 상태를 나타내는 태그

사용 예:

<progress id="file" max="100" value="70"> </progress>



###meter 태그

prgress와 유사하지만 진행상황이 아닌 차지하는 비율을 나타내기 위해서 사용되는 태그

속성:

- low, high : 이상적인 값의 범위
- min, max: 값의 범위
- value: 현재 값
- optimum: 이상적인 값의 위치 => min low high max 사이에서 어디가 이상적인지 알려주기위해 사용

사용 예:

<meter id="fuel"
       min="0" max="100"
       low="33" high="66" optimum="80"
       value="50">
    at 50/100
</meter>





## 시맨틱 태그

태그만 보고도 페이지 구조를 쉽게 이해할 수 있도록 정의된  태그

IE8 이하 버전에서는 시맨틱 태그를 인식하지 못하므로 이를 해결해주어야한다.



해결방법 1

```html
<head>
  <script>
  	document.createElement('article');
   	document.createElement('section');
    .....
  </script>
</head>
```

와 같이 작업해 태그를 추가 해준다.



해결방법 2

html5 shiv 사용하기

```html
<!--[if lt IE 9]
	<script src="js/html5shiv.js"></script>
<![endif] -->
```

html5shiv 파일을 다운로드 받은 후 실행시켜준다.

<!--[if lt IE 9]--> 는 IE9 이전일 경우 실행하라는 의미입니다.



### header 태그

주로 페이지 맨 위쪽이나 왼쪽에 삽입, form태그를 활용해 검색창을 넣거나, nav태그를 사용해 사이트 메뉴를 넣는다.



### nav태그

네비게이션 역할을 하는 링크 모음을 나타낸다.

네비게이션 메뉴 뿐 아니라 푸터에 있는 사이트 링크 모음에서도 많이 사용된다.



### section 태그

주제별 콘텐츠 영역을 나타내는 태그입니다.

h1~ h6 제목 태그가 함께 사용됩니다.

section 안에 section을 넣을 수 있습니다.

여러 article을 주제별로 묶는데 사용합니다.



### article 태그

웹 상의 실제 내용을 넣습니다.

태그를 적용한 부분을 따로 떼어내도 독립적인 콘텐츠가 될 수 있으면 article을 사용합니다.



### aside 태그

본문 내용 외에 주변에 표시되는 기타 내용을 나타냅니다.

중요도가 떨어지는 내용들을 담습니다.



### iframe 태그

외부 문서를 삽입할 때 사용합니다.

속성값: width / height / name / src / seamless (테두리를 없애 본문의 일부처럼 보이도록 만드는 속성, 크롬과 사파리에서만 지원)



### footer 태그

제작 정보와 저작권 정보 연락처 등을 담는데 사용합니다.



### address태그

제작자 정보 / 연락처 정보 등을 넣는데 사용됩니다.



### div는 언제 사용할까?

div는 주로 콘텐츠를 묶어  css를 적용할 때  사용한다.



## 멀티미디어 태그



오디오나 비디오 같은 멀티미디어를 재생할 수 있도록 도와주는 태그

[object 태그](https://developer.mozilla.org/ko/docs/Web/HTML/Element/object)와 [embed 태그](https://developer.mozilla.org/ko/docs/Web/HTML/Element/embed)를 활용하는 방법도 존재한다.



### audio / video 태그

오디오 / 영상 파일 삽입하기



속성값: 

- autoplay: 자동 재생
- controls 컨트롤 막대 표시
- loop: 반복 재생
- muted: 소리 끄기
- preload: 재생 전에 파일을 다운로드해서 준비
  none / metadata(메타 정보만 다운로드) / auto(즉시 이용가능하도록 모두 다운로드 합니다.)
- poster: 문제 상황이 생길경우 보여질 이미지 파일



> track 태그를 활용해 비디오 화면에 자막을 추가할 수 있습니다.
>
> 사용 예
>
> ```html
> <track kind="자막 종류" src="경로" srclang="언어" label="제목" default>
> ```
>
> 속성 값: 
>
> - kind: subtitles / captions(청각 장애인용 자막) / descriptions(비디오 컨텐츠에 대한 설명) / chapters(비디오 탐색을 위한 장 제목) / metadata(비디오 컨텐츠 정보)
> - default 자막이 여러개일 경우 기본값을 설정해주기위해 사용된다.



사용 예:

```html
<audio src="paht" 속성값들/>
```



### source 태그

지원되는 코덱이 브라우저별로 달라, 상황에 맞추어 사용할 수 있도록 여러 미디어 파일을 한꺼번에 지정하는데 사용된다.



**반응형** 

media 속성을 활용하여 화면에 표시할 이미지를 다르게 지정할 수 있다.



사용예:

```html
<video controls>
	<source src="Painting.mp4" type="video/mp4" media="(min-width: 1024px)">
 	<source src="Painting.webm" type="video/webm">
 	<source src="Painting.ogv" type="video/ogv">
  위 파일들이 모두 실행되지 않을 때 보여지는 텍스트
</video>
```





## Global attributes ([문서](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes))

모든 HTML에서 공통으로 사용할 수 있는 특성

하지만 일부 Element에서는 아무런 효과가 없을 수 있습니다.



### title

추가 정보를 제공하는 텍스트로 보통 툴팁으로서 보여집니다.





# CSS3



## 스타일 우선순위

1. 사용자 스타일 시트
   저시력자, 색약자 등 특별한 조건이 필요한 사용자가 사용하는 기능
2. 중요 스타일 (!important)
3. 인라인 스타일
4. id 스타일
5. 클래스 스타일
6. 태그 스타일
7. 기본 브라우저 스타일 시트

우선순위가 같다면 시트 내부의 순서에서 나중에 온 스타일이 덮어쓰기 된다.



## CSS3와 브라우저 접두사

표준규약이 완성되지 않은 css모듈을 각 브라우저별로 다른 방식으로 제공하고있어 이를 접두사로 구분하고있음

-webkit-: 사파리, 크롬 등

-moz-: 모질라, 파이어폭스 등

-o-: 오페라 브라우저

-ms-: 마이크로소프트 인터넷 익스플로러



prefixfree를 통해 접두사를 자동으로 붙이도록 만들 수 있음



## 웹폰트

웹 문서를 작성할 때 웹 문서 안에 글꼴 정보도 함께 저장했다 사용자가 웹 문서에 접속하면 글골을 사용자 시스템으로 다운로드시키는 방식.



사용방식 1

```css
@import url(사용하고자 하는 font url);

body {
  font-family: 글꼴 이름;
}
```

사용방식 2

@font-face 속성을 사용

```css
@font-face {
  font-family: 글꼴 이름;
  src: url(글꼴 파일 경로) format(파일 유형);
}
```



## 속성 정리



### text-overflow: clip* | ellipsis

- clip: 텍스트를 자릅니다.
- ellipsis: 말 줄임표로 잘린 텍스트



### background-origin: border-box | padding-box* | content-box

- border-box: 박스 모델의 가장 외곽인 테두리가 기준
- padding-box: 패딩 역역부터 시작
- content-box: 콘텐츠 영역부터 시작



### background에 그라데이션 넣기

- linear-gradient(각도 to 방향 ...색상)
- radial-gradient(최종 모양 크기 at 위치 ...색상)
- repeating-linear-gradient / repeating-radial-gradient 그라데이션 반복



### 다단으로 편집하기

- column-width: 크기 | auto*
  단의 너비 설정
- column-count: 숫자 | auto*
  단의 개수 설정(auto로 설정시 column-width를 기준으로 자동 계산)
- column-gap: 크기 | normal*
  단 사이의 여백 설정(기본값은 1em)
- column-rule: 너비 | 스타일 | 색상
- column-span: 1* | all
  단을 합치거나 합치지 않거나(1)



### transform-origin

transform  속성은 x축, y축, z축을 default 기준으로 사용한다. 이러한 기준점을 바꾸기 위해 사용하는 속성이다.



### transform-style: *flat | preserve-3d

부모 요소에 적용한 3D 변형을 하위 요소에도 적용할 수 있다.



###perspective / perspective-origin 속성

밀어 당기거나 잡아당겨 원근감을 가지도록 만드는 속성이다.



### backface-visibility

회전한 각도가 90도를 넘을 때 뒷면을 표시할지 결정



## 트렌지션



### transition-property: all* | none | <속성 이름>

트랜지션을 적용할 속성 지정하기위해 사용된다. 여러 속성을 사용할 때는 속성 이름값 뒤에 ,(쉼표)로 구분해 사용한다.



### transiton-duration: <시간>

진행시간을 설정해주는 값이다. 기본 설정 시간은 0으로 되어있어 무조건 설정해주어야하는 값이다.

여러 속성에 다른 시간을 적용 할때는 ,(쉼표)로 구분해 나열한다. 개수가 일치하지 않을 경우 순서대로 반복 적용된다.



### transition-timing-function

: linear | ease* | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) -> 직접 정의



### transition-delay: <시간>

트랜지션이 언제부터 시작할 것인지 설정한다.



transition: property | duration | timing-function | delay 순서로 속성값을 나열하면 한줄에 표현할 수 있다.



## 애니메이션

[참고 블로그](https://brunch.co.kr/@99-life/3)

@keyframes를 통해 애니메이션이 바뀌는 지점을 설정할 수 있다.



### animation-name: 키프레임 이름

사용할 키프레임 이름을 설정한다.



### animation-duration: <시간>

애니메이션 실행시간을 설정한다.



### animation-direction: normal* | alternate | **reverse** | **alternate-reverse**

normal: 정방향

reverse: 역방향

alternate: 매 사이클마다 각 주기의 방향을 뒤집으며, 첫 시작은 정방향이다.

alternate-reverse: 매 사이클마다 각 주기의 방향을 뒤집으며, 첫 시작은 역방향이다.



### animation-iteration-count: <숫자> | infinite

애니메이션이 실행되는 반복 횟수이다. **기본값은 1**



###animation-timing-function

: linear | ease* | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) -> 직접 정의



### animation-play-state: paused | running*

애니메이션이 실행될지 결정한다.



### animation-fill-mode: none | forwards | backwards | both

애니메이션 스타일과 기본 스타일의 설정에 대한 설정을 해주는 속성입니다.

none : 아무것도 지정되지 않을 상태입니다.

forwards : 애니메이션이 키프레임의 100%에 도달했을 때 마지막 키프레임을 유지합니다.

backwards : 애니메이션의 스타일을 애니메이션이 실제로 시작되기 전에 미리 적용합니다.

both : fowards / backwards 를 모두 적용합니다.





## 미디어 쿼리

기본적인 구문 형태: @media [ only | not ] 미디어 유형 [ and 조건 ] * [ and 조건 ]

미디어 유형:

| 미디어 유형 |                  사용 가능한 미디어                  |
| :---------: | :--------------------------------------------------: |
|     all     |                   모든 미디어 유형                   |
|    print    |                      인쇄 장치                       |
|   screen    |                    컴퓨터 스크린                     |
|     tv      |            음성과 영상이 동시 출력되는 tv            |
|    aural    |         음성 합성 장치(화면을 읽어주는 장치)         |
|   braille   |                    점자 표시 장치                    |
|  handheld   |            패드처럼 손에 들고 다니는 장치            |
| projection  |                       프로젝터                       |
|     tty     | 디스플레이 기능이 제한된 장치(픽셀을 사용할 수 없음) |
|  embossed   |                     점자 프린터                      |



### 미디어 쿼리 조건

- 가로 너비 세로 높이
- 화면 회전 (orientation: landscape - 가로 | potrait - 세로)
- 화면 비율 (aspect-ratio: width / height)
- 색상 당 비트 수(color)





## 마진 상쇄 규칙 ([공식문서](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing), [참고 블로그](https://velog.io/@raram2/CSS-%EB%A7%88%EC%A7%84-%EC%83%81%EC%87%84Margin-collapsing-%EC%9B%90%EB%A6%AC-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4))

1. 인접 형제 박스 간 상하 마진이 겹칠 때
2. 빈 요소의 상하 마진이 겹칠 때
3. 부모 박스와 첫 번째(마지막) 자식 박스의 상단(하단) 마진이 겹칠 때



## CSS 선택자



### 속성 선택자

태그 안에 있는 속성값들에 따라 스타일을 지정할 수 있다.

사용 예:

```css
a[href] {
  특정 속성이 있는 태그에 사용
}

a[target="_blank"] {
	특정 값을 갖는 속성에 사용
}

[class ~="button"] {
  속성값이 여러개일 때 사용
}

a[title |="us"] {
  특정 값이 포함된 속성에 스타일 적용
}

a[title ^="us"] {
  특정 값으로 시작하는 속성에 스타일 적용
}

a[title $="us"] {
  특정 값으로 끝나는 속성에 스타일 적용
}

a[title *="us"] {
  일부가 특정값에 일치하는 속성에 스타일 적용
}
```



## 가상 클래스 & 가상 요소

기본적인 선자들로도 지정하기 어려운 대상들을 선택하기 위해 사용하는 요소

:를 붙여 사용하는 **가상클래스**와 ::를 이름앞에 붙이는 **가상 요소**가 있다.



### root 가상 클래스

문서 전체에 적용할 스타일이 있을 경우 사용한다.



**n에 점화식을 넣을 수 있음.** 예) 2n => 짝수
**first / last를 통해 첫 번째와 마지막에 접근 가능**

### nth-child(n)과 :nth-last-child(n) 가상 클래스

문서 구조로 표현했을때 같은 레벨이며 같은 부모를 가지는 요소에 스타일을 적용하기 위해 사용된다.



### nth-of-type(n)과 nth-last-of-type(n) 가상 클래스

id나 class가 없이 몇번째 태그인지 선택하고 싶을 때 사용한다.



### only-child와 only-of-type 가상 클래스

자식요소가 하나 뿐일 때 / 해당 태그가 하나뿐일 때 선택된다.



### targer 가상 클래스

앵커의 목적지가 되는 부분의 스타일을 지정할 수 있다.



### first-line과 first-letter 가상 요소

첫 번째 줄이나 첫 글자에 스타일을 적용할 수있도록 도와준다.



# SVG

svg는 XHTML 스펙을 따르고 있기 때문에 xmlns 를 통해 NameSpace를 지정해줘야한다.

Modernizr.svg를 통해 js에서 svg를 지원해주는지 확인할 수 있음



## 접근성

접근성을 높이기 위해 role, aria-label 속성과 title, desc 태그를 사용하는것이 좋다.

[참고 링크](https://stackoverflow.com/questions/4697100/accessibility-recommended-alt-text-convention-for-svg-and-mathml)



# 호스팅



다른 사람들이 html 문서를 볼 수 있도록 서버 컴퓨터로 옮기는 작업

FTP 프로그램으로 인터넷에 올림 (FTP : 서버와 클라이언트간에 파일을 주고 받을 수 있게 해주는 파일 전송 프로토콜)

보통 호스팅 서비스를 이용해서 서버 컴퓨터를 빌려서 사용

무료 호스팅 사이트 : 닷홈 (이외에도 많음)

### 호스팅 종류

윈도우 서버 호스팅 / 리눅스 서버 호스팅 / 클라우드 서버 호스팅



