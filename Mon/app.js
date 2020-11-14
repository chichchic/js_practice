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
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
var positions = [
  -0.7,
  0.7,
  -0.7,
  -0.7,
  0.7,
  -0.7,
  0.7,
  0.7,
  -0.7,
  0.7,
  0.7,
  -0.7,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
var r1 = Math.random() * 256; // 0 ~ 255.99999
var b1 = Math.random() * 256; // 이 값들은
var g1 = Math.random() * 256; // Uint8Array로
var r2 = Math.random() * 256; // 저장될 때
var b2 = Math.random() * 256; // 소수값은 버려질 겁니다.
var g2 = Math.random() * 256;
var colors = [
  r1,
  b1,
  g1,
  255,
  r1,
  b1,
  g1,
  255,
  r1,
  b1,
  g1,
  255,
  r2,
  b2,
  g2,
  255,
  r2,
  b2,
  g2,
  255,
  r2,
  b2,
  g2,
  255,
];
gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// canvas를 clear처리
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 어느 셰이더 프로그램을 사용할지 지정
gl.useProgram(program);
// 해상도 설정
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
//색상 애트리뷰트가 어떻게 색상 버퍼의 데이타를 참조할지 지정함
gl.enableVertexAttribArray(colorAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
var size = 4;
var type = gl.UNSIGNED_BYTE;
var normalize = true;
var stride = 0;
var offset = 0;
gl.vertexAttribPointer(
  colorAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

gl.uniformMatrix4fv(matrixUniformLocation, false, [
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
]);

//GLSL 프로그램을 실행하도록 요청
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = positions.length / 2;
gl.drawArrays(primitiveType, offset, count);
