# 실습 내용 정리





## 내가 배운것

1. WebGL은 GPU를 통해 점, 선, 삼각형을 그려준다. 이를 위해 vertex shader와 fragment shader로 불리는 GLSL을 사용해야한다.(이 둘을 합쳐 program이라 부른다.)

2. vertext shader는 clip 공간 좌표를 생성한다.

   ```glsl
   void main() {
     gl_Position = doMathToMakeClipspaceCoordinates
   }
   ```

   항상 위와 같은 양식을 취한다.

   shader는 각 vertex 당 한 번씩 호출되야한다. 호출될때마다 특수 전역 변수 gl_position을 일부 clip 공간 좌표로 설정해줘야 한다.

   vertex shader가 데이터를 얻는 방법

   - Attributes (buffer에서 가져온 데이터)
     buffer는 GPU에 올리는 2진 데이터 배열이다. 주로 위치, 법선, 텍스처 좌표, 색상 등을 포함하지만 원하는 것을 자유롭게 넣을 수 있다.

     ```glsl
     attribute vec4 a_position;
     //float, vec2, vec3, vec4, mat2, mat3, mat4를 사용할 수 있다.

     void main() {
       gl_Position = a_position;
     }
     ```



     ```javascript
     //버퍼 만들기
     var buf = gl.createBuffer();
     //버퍼에 데이터 넣기
     gl.bindBuffer(gl.ARRAY_BUFFER, buf);
     gl.bufferData(gl.ARRAY_BUFFER, someData, gl.STATIC_DRAW);
     //초기화 할 때 주어진 shader program으로 attribute의 위치 찾기
     var positionLoc = gl.getAttribLocation(someShaderProgram, "a_position");
     // attribute의 buffer에서 데이터 가져오기 활성화
     gl.enableVertexAttribArray(positionLoc);
     var numComponents = 3;  // (x, y, z)
     var type = gl.FLOAT;    // 32bit 부동 소수점
     var normalize = false;  // 값 원본 그댜로 보존
     var offset = 0;         // buffer의 시작점에서 시작
     var stride = 0;         // 다음 vertex로 가기 위해 이동해야할 byte 수
                             // 0 = 자료형과 numComponents에 따른 적절한 폭 사용
     gl.vertexAttribPointer(
         positionLoc,
         numComponents,
         type,
         false,
         stride,
         offset
     );
     ```



   - Uniforms (단일 그리기 호출의 모든 vertex에 대해 동일하게 유지하는 값, 사실상 전역 변수)
     draw가 호출될 때 모든 vertex에서 동일하게 유지되는 전달값입니다.
     간단한 예로 vertex shader에 offset을 추가할 수 있습니다.

     ```glsl
     attribute vec4 a_position;
     uniform vec4 u_offset;

     void main() {
       gl_Position = a_position + u_offset;
     }
     ```


     ```js
     var offsetLoc = gl.getUniformLocation(someProgram, "u_offset");
     gl.uniform4fv(offsetLoc, [1, 0, 0, 0]);  // 화면 우측 절반으로 offset 지정, gl.useProgram에 넘긴 마지막 프로그램의 uniform에만 설정 됨
     ```

   - Textures (pixel/texel의 데이터)
     *fragment와 동일*

3. fragment shader은 현재 픽셀의 색상을 제공합니다.

   ```glsl
   precision mediump float;

   void main() {
     gl_FragColor = doMathToMakeAColor;
   }
   ```

   각 픽셀마다 한 번씩 호출됩니다. 호출 될 때마다 gl_FragColor를 어떤 색상으로 설정해주어야 합니다.

   fragment shader가 데이터를 얻는 방법

   - Uniform (단일 그리기 호출의 모든 vertex에 대해 동일하게 유지하는 값)
     *vertex와 동일*

   - Texture (pixel/texel의 데이터)

     ```glsl
     precision mediump float;

     uniform sampler2D u_texture;

     void main() {
       vec2 texcoord = vec2(0.5, 0.5)  // texture 중간에 있는 값 얻기
       gl_FragColor = texture2D(u_texture, texcoord); // 값 추출
     }
     ```

     ```javascript
     var tex = gl.createTexture();
     gl.bindTexture(gl.TEXTURE_2D, tex);
     var level = 0;
     var width = 2;
     var height = 1;
     var data = new Uint8Array([
       255, 0, 0, 255,   // 빨강 pixel
       0, 255, 0, 255,   // 초록 pixel
     ]);
     gl.texImage2D(
         gl.TEXTURE_2D,
         level,
         gl.RGBA,
         width,
         height,
         0,
         gl.RGBA,
         gl.UNSIGNED_BYTE,
         data
     );
     ```



   - Varying (vertex shader에서 전달되고 보관된 데이터)

     vertex shader에서 fragment shader로 값을 넘기는데 사용된다.

     ```glsl
     //Vertex Shader
     attribute vec4 a_position;

     uniform vec4 u_offset;

     varying vec4 v_positionWithOffset; //동일한 이름

     void main() {
       gl_Position = a_position + u_offset;
       v_positionWithOffset = a_position + u_offset;
     }
     ```

     ```glsl
     //Fragment Shader
     precision mediump float;

     varying vec4 v_positionWithOffset; //동일한 이름

     void main() {
       // clip 공간에서 (-1 <-> +1) 색상 공간으로 (0 -> 1) 변환.
       vec4 color = v_positionWithOffset * 0.5 + 0.5
       gl_FragColor = color;
     }
     ```

     두 shader에 일치하는(데이터 타입과 변수 명이 동일한) varying을 선언해야한다.

4. GLSL

   shader에 사용되는 GLSL은 vector연산을 할 수 있습니다.