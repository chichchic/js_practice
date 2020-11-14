var canvas = document.getElementById("c");
var gl = canvas.getContext("webgl");
if (!gl) {
  console.log("no webgl for you!");
}

var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

var program = createProgram(gl, vertexShader, fragmentShader);

var positionBuffer = gl.createBuffer();
/*
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var positions = [10, 20, 200, 20, 10, 150, 10, 150, 200, 20, 200, 150];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
*/

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
var colorUniformLocation = gl.getUniformLocation(program, "u_color");
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// canvas를 clear처리
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 어느 셰이더 프로그램을 사용할지 지정
gl.useProgram(program);
// 해상도 설정
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var size = 2; // 각 반복마다 2개씩 버퍼 데이타 참조
var type = gl.FLOAT; // 32bit 부동 소수점 값
var normalize = false; // 데이터를 노말라이즈 하지 않는다.
var stride = 0; // 0 = move forward size * sizeof(type) 각 반복마다 다음 위치
var offset = 0; // 버퍼 시작 위치
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

/*
//GLSL 프로그램을 실행하도록 요청
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);
*/

for (var i = 0; i < 50; ++i) {
  // 무작위 사각형을 설정합니다.
  // 이것은 positionBuffer에 설정할 겁니다.
  // 왜냐하면 위 코드에서 마지막
  // ARRAY_BUFFER 바인드 포인트는
  // positionBuffer이기 때문입니다.
  setRectangle(
    gl,
    randomInt(300), //x
    randomInt(300), //y
    randomInt(300), //width
    randomInt(300) //height
  );

  // 무작위 색을 셋팅한다.
  gl.uniform4f(
    colorUniformLocation,
    Math.random(), //red
    Math.random(), //green
    Math.random(), //blue
    1 //opacity
  );

  // 사각형을 그린다.
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// 사각형을 정의하는 값으로 버퍼에 제공함
function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  //참고 : gl.bufferData(gl.ARRAY_BUFFER, ...) 는 현재
  //`ARRAY_BUFFER` 바인드 포인트가 가리키는 버퍼에만 영향을 줍니다.
  //만약 여러개의 버퍼를 가지고 있다면
  //그 버퍼를 먼저 바인딩 해야 합니다.
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}
