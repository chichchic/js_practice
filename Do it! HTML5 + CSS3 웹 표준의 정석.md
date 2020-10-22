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



## Global attributes ([문서](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes))

모든 HTML에서 공통으로 사용할 수 있는 특성

하지만 일부 Element에서는 아무런 효과가 없을 수 있습니다.



### title

추가 정보를 제공하는 텍스트로 보통 툴팁으로서 보여집니다.





# CSS3



## 속성 정리



# 호스팅



다른 사람들이 html 문서를 볼 수 있도록 서버 컴퓨터로 옮기는 작업

FTP 프로그램으로 인터넷에 올림 (FTP : 서버와 클라이언트간에 파일을 주고 받을 수 있게 해주는 파일 전송 프로토콜)

보통 호스팅 서비스를 이용해서 서버 컴퓨터를 빌려서 사용

무료 호스팅 사이트 : 닷홈 (이외에도 많음)

### 호스팅 종류

윈도우 서버 호스팅 / 리눅스 서버 호스팅 / 클라우드 서버 호스팅



