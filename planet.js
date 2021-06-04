"use strict"
let gl, canvas, viewProjectionMatrix, sphereBufferInfo, sphereTranslation, sphereUniforms, programInfo;
let shapes;
function main(){
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    canvas = document.querySelector("#myCanvas");
    gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // setup GLSL program
    programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);
    setupShapes();
    requestAnimationFrame(mainLoop);
}

function mainLoop(time) {
    time *= 0.001;
    clearCanvas();
    updateCamera();
    updateShapes(time);
    drawShapes();
    requestAnimationFrame(mainLoop);
}

function clearCanvas() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function updateCamera() {
    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    var fieldOfViewRadians = degToRad(60);
    var projectionMatrix =
        m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, 100];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);
    viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
}

function setupShapes() {
    // creates buffers with position, normal, texcoord, and vertex color
    // data for primitives by calling gl.createBuffer, gl.bindBuffer,
    // and gl.bufferData
    let radius = 30;
    let subdivisionsAxis = 24;
    let subdivisionsHeight = 24;
    sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, radius, subdivisionsAxis, subdivisionsHeight);
    sphereUniforms = {
        u_colorMult: [1, 0.5, 1, 1],
        u_matrix: m4.identity(),
    };
    shapes = [
        {
            programInfo: programInfo,
            bufferInfo: sphereBufferInfo,
            uniforms: sphereUniforms
        }
    ];
}

function updateShapes(time) {
    time *= 8;
    // Setup all the needed attributes.
    sphereTranslation = [0, 0, 0];
    let matrix = m4.translate(viewProjectionMatrix,
        sphereTranslation[0],
        sphereTranslation[1],
        sphereTranslation[2]);
    matrix = m4.xRotate(matrix, Math.PI * 0.1);
    matrix = m4.zRotate(matrix, Math.PI * 0.15 + time * 0.1);
    matrix = m4.yRotate(matrix, -time);
    sphereUniforms.u_matrix = matrix;
}

function drawShapes() {
    shapes.forEach(function(object) {
        let bufferInfo = object.bufferInfo;

        gl.useProgram(object.programInfo.program);

        // Setup all the needed attributes.
        webglUtils.setBuffersAndAttributes(gl, object.programInfo, bufferInfo);

        // Set the uniforms.
        webglUtils.setUniforms(object.programInfo, object.uniforms);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);
    });
}

main();