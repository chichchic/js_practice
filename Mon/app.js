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
var positions = [0, 0.7, -0.7, -0.7, 0.7, -0.7];
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// canvas를 clear처리
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 어느 셰이더 프로그램을 사용할지 지정
gl.useProgram(program);
// 해상도 설정
gl.enableVertexAttribArray(positionAttributeLocation);

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
