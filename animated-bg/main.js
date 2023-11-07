const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.error("WebGL is not supported in your browser.");
}

// https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html
const vertexShaderSource = `
    attribute vec2 position;

    void main(void) {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    uniform float time;

    void main(void) {
        gl_FragColor = vec4(
            abs(sin(time)),
            abs(cos(time)),
            abs(sin(time + 1.0)),
            1.0
        );
    }
`;

// Create shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error("An error occurred compiling the vertex shader.");
}

gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error("An error occurred compiling the fragment shader.");
}

// Create a shader program
const shaderProgram = gl.createProgram();

gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);

gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Set up a buffer for a single fullscreen triangle
const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionAttribLocation = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(positionAttribLocation);
gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

// Set the time uniform
const timeUniformLocation = gl.getUniformLocation(shaderProgram, "time");
let startTime = Date.now();

const render = () => {
  const currentTime = (Date.now() - startTime) * 0.001;
  gl.uniform1f(timeUniformLocation, currentTime);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimationFrame(render);
};

render();
