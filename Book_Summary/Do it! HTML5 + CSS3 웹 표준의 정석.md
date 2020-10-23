# html5



## 태그 정리



### meta 태그

meta 태그를 이용해 문서에 대한 간단한 설명을 지정할 수 있다.

 사용 예:

``` html
<meta charset="utf-8">
<meta name = "description" content="짧은 설명">
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

## 속성 정리



## 마진 상쇄 규칙 ([공식문서](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing), [참고 블로그](https://velog.io/@raram2/CSS-%EB%A7%88%EC%A7%84-%EC%83%81%EC%87%84Margin-collapsing-%EC%9B%90%EB%A6%AC-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4))

1. 인접 형제 박스 간 상하 마진이 겹칠 때
2. 빈 요소의 상하 마진이 겹칠 때
3. 부모 박스와 첫 번째(마지막) 자식 박스의 상단(하단) 마진이 겹칠 때







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



