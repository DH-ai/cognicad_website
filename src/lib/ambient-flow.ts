const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform vec2 u_trail_a;
uniform vec2 u_trail_b;
uniform float u_pointer_speed;
uniform float u_pointer_down;
uniform float u_wake_strength;
uniform float u_time;
uniform float u_light_mode;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);

  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x),
    local.y
  );
}

float fbm(vec2 point) {
  float result = 0.0;
  float amplitude = 0.5;

  for (int index = 0; index < 3; index++) {
    result += amplitude * noise(point);
    point = point * 2.03 + vec2(17.3, 9.2);
    amplitude *= 0.5;
  }

  return result;
}

float gaussianBand(vec2 point, float centre, float width, float phase, float time, float turbulence) {
  float broadWave = sin(point.x * 1.18 + phase + time * 0.72) * 0.09;
  float fineWave = sin(point.x * 2.7 - phase + time * 0.34) * 0.035;
  float axis = centre + broadWave + fineWave + turbulence;
  return exp(-pow(abs(point.y - axis) / width, 2.0));
}

vec2 warpAround(vec2 point, vec2 centre, float pull, float swirl) {
  vec2 delta = point - centre;
  float distanceToCentre = max(length(delta), 0.0001);
  float influence = exp(-(distanceToCentre * distanceToCentre) / 0.018);
  vec2 normal = delta / distanceToCentre;
  vec2 tangent = vec2(-normal.y, normal.x);

  return point - normal * influence * pull + tangent * influence * swirl;
}

float ringAt(vec2 point, vec2 centre, float radius, float width) {
  float distanceToCentre = length(point - centre);
  return exp(-pow((distanceToCentre - radius) / width, 2.0));
}

float distanceToSegment(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  float lengthSquared = max(dot(segment, segment), 0.0001);
  float position = clamp(dot(point - start, segment) / lengthSquared, 0.0, 1.0);
  return length(point - (start + segment * position));
}

float particleField(vec2 point, float aspect, float time, float turbulence) {
  vec2 centre = vec2(aspect * 0.64, 0.36);
  vec2 local = point - centre;
  float angle = atan(local.y, local.x);
  float radius = length(local * vec2(0.73, 1.34));

  local += vec2(
    sin(angle * 3.0 + radius * 14.0 - time * 1.5) * 0.027,
    cos(angle * 2.0 - radius * 17.0 + time) * 0.022
  );
  local += vec2(turbulence * 0.18, turbulence * 0.09);

  vec2 lattice = fract(local * vec2(72.0, 78.0)) - 0.5;
  float dotShape = 1.0 - smoothstep(0.065, 0.145, length(lattice));
  float brokenEdge = (noise(local * 3.4 + time * 0.08) - 0.5) * 0.19;
  float mask = 1.0 - smoothstep(0.32, 0.67, radius + brokenEdge);
  float shimmer = 0.55 + 0.45 * noise(floor(local * vec2(72.0, 78.0)) * 0.17 + time * 0.18);

  return dotShape * mask * shimmer;
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
  vec2 basePoint = vec2(uv.x * aspect, uv.y);
  vec2 pointer = vec2(u_pointer.x * aspect, u_pointer.y);
  vec2 trailA = vec2(u_trail_a.x * aspect, u_trail_a.y);
  vec2 trailB = vec2(u_trail_b.x * aspect, u_trail_b.y);
  float time = u_time * 0.16;

  // The pointer dents the field locally. Two slower samples create the short,
  // fluid wake visible in the reference rather than translating the whole art.
  float interaction = 0.022 + u_pointer_speed * 0.042 + u_pointer_down * 0.025;
  vec2 flowPoint = warpAround(basePoint, pointer, interaction, u_pointer_speed * 0.027);
  flowPoint = warpAround(flowPoint, trailA, u_wake_strength * 0.021, -u_wake_strength * 0.011);
  flowPoint = warpAround(flowPoint, trailB, u_wake_strength * 0.012, u_wake_strength * 0.007);

  // Treat the delayed samples as a curved velocity ribbon. It gently advects
  // particle coordinates along the travelled path instead of painting a thick
  // trail over the interface.
  vec2 wakeVector = pointer - trailB;
  float wakeLength = max(length(wakeVector), 0.0001);
  vec2 wakeDirection = wakeVector / wakeLength;
  vec2 wakeNormal = vec2(-wakeDirection.y, wakeDirection.x);
  float firstSegment = distanceToSegment(basePoint, pointer, trailA);
  float secondSegment = distanceToSegment(basePoint, trailA, trailB);
  float wakeRibbon = exp(-(firstSegment * firstSegment) / 0.0032);
  wakeRibbon += exp(-(secondSegment * secondSegment) / 0.0045) * 0.58;
  wakeRibbon *= u_wake_strength * smoothstep(0.012, 0.14, wakeLength);
  float wakePosition = dot(basePoint - trailB, wakeDirection) / wakeLength;
  float wakeWave = sin(wakePosition * 9.0 - time * 5.0);
  flowPoint -= wakeDirection * wakeRibbon * 0.01;
  flowPoint += wakeNormal * wakeWave * wakeRibbon * 0.012;

  float turbulence = (fbm(flowPoint * 1.18 + vec2(time * 0.15, -time * 0.08)) - 0.5) * 0.27;
  float upperMass = gaussianBand(flowPoint, 0.02, 0.32, 1.1, time, turbulence);
  float middleFold = gaussianBand(flowPoint, 0.19, 0.17, 3.7, time + 1.2, turbulence * 0.72);
  float brightFold = gaussianBand(flowPoint, 0.10, 0.105, 5.4, time - 0.8, turbulence * 0.48);
  float lowerVeil = gaussianBand(flowPoint, 0.34, 0.24, 2.3, time + 2.2, turbulence * 0.55);
  // One noise sample is enough for highlight grain. A second multi-octave FBM
  // here doubled a large part of the fragment cost without adding useful form.
  float surfaceNoise = noise(flowPoint * 2.05 + vec2(-time * 0.08, time * 0.05));
  float particles = particleField(flowPoint, aspect, time, turbulence);

  float pointerDistance = length(basePoint - pointer);
  float ringRadius = 0.052 + u_pointer_speed * 0.045 + u_pointer_down * 0.022;
  float pointerRing = ringAt(basePoint, pointer, ringRadius, 0.009 + u_pointer_speed * 0.006);
  float wakeRings = ringAt(basePoint, trailA, 0.047, 0.011) * u_wake_strength * 0.5;
  wakeRings += ringAt(basePoint, trailB, 0.043, 0.012) * u_wake_strength * 0.26;
  float dimple = exp(-(pointerDistance * pointerDistance) / 0.0025);

  vec3 deepNavy = vec3(0.004, 0.012, 0.027);
  vec3 hazeBlue = vec3(0.012, 0.055, 0.12);
  vec3 bodyBlue = vec3(0.04, 0.13, 0.25);
  vec3 iceBlue = vec3(0.24, 0.38, 0.52);
  vec3 pearl = vec3(0.40, 0.50, 0.56);
  vec3 darkColour = mix(vec3(0.008, 0.032, 0.068), deepNavy, smoothstep(0.12, 0.92, uv.y));

  darkColour += hazeBlue * (upperMass * 0.36 + lowerVeil * 0.16);
  darkColour += bodyBlue * (upperMass * 0.26 + middleFold * 0.44);
  darkColour += iceBlue * pow(brightFold, 2.4) * (0.18 + surfaceNoise * 0.18);
  darkColour += pearl * pow(brightFold, 6.0) * (0.06 + surfaceNoise * 0.1);
  darkColour += vec3(0.15, 0.32, 0.47) * particles * (0.26 + upperMass * 0.2);
  darkColour += bodyBlue * wakeRibbon * (0.045 + surfaceNoise * 0.035);

  // Bright rim plus a darker centre reads as a pressure dimple. A moving
  // pointer stretches that dimple into two progressively softer rings.
  darkColour += iceBlue * (pointerRing * (0.1 + u_pointer_speed * 0.22) + wakeRings * 0.2);
  darkColour -= vec3(0.025, 0.07, 0.13) * dimple * (0.16 + u_pointer_down * 0.26);

  // Light mode uses the same geometry with a purpose-built paper palette.
  // Dark dots and pressure rings retain definition without compromising the
  // foreground's Ink-on-Paper contrast.
  vec3 paper = vec3(0.957, 0.953, 0.933);
  vec3 paleSteel = vec3(0.70, 0.82, 0.91);
  vec3 softBlue = vec3(0.48, 0.68, 0.84);
  vec3 blueprint = vec3(0.08, 0.28, 0.48);
  vec3 lightColour = mix(vec3(0.82, 0.89, 0.95), paper, smoothstep(0.12, 0.92, uv.y));

  lightColour = mix(lightColour, paleSteel, upperMass * 0.34 + lowerVeil * 0.1);
  lightColour = mix(lightColour, softBlue, middleFold * 0.2);
  lightColour += vec3(0.12, 0.15, 0.16) * pow(brightFold, 4.0) * (0.08 + surfaceNoise * 0.08);
  float particleInk = clamp(particles * (0.44 + upperMass * 0.18), 0.0, 0.7);
  float ringInk = clamp(pointerRing * (0.22 + u_pointer_speed * 0.5) + wakeRings * 0.38, 0.0, 0.72);
  lightColour = mix(lightColour, blueprint, particleInk);
  lightColour = mix(lightColour, blueprint, ringInk);
  lightColour = mix(lightColour, softBlue, clamp(wakeRibbon * 0.07, 0.0, 0.12));
  lightColour = mix(lightColour, vec3(0.91, 0.95, 0.97), dimple * (0.1 + u_pointer_down * 0.12));

  float horizontalVignette = 1.0 - smoothstep(0.5, 1.4, abs(uv.x - 0.53) * 1.35);
  darkColour *= 0.84 + horizontalVignette * 0.16;
  lightColour *= 0.96 + horizontalVignette * 0.04;

  // Fade into the site rather than ending at a rectangular canvas edge.
  float pageFade = 1.0 - smoothstep(0.48, 0.98, uv.y);
  darkColour = mix(deepNavy, darkColour, pageFade);
  lightColour = mix(paper, lightColour, pageFade);
  vec3 colour = mix(darkColour, lightColour, u_light_mode);

  gl_FragColor = vec4(max(colour, vec3(0.0)), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create the ambient-flow shader.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "Unknown shader error";
    gl.deleteShader(shader);
    throw new Error(info);
  }

  return shader;
}

/**
 * Starts the interactive shader backdrop. It is deliberately a single-pass
 * renderer: the pointer still creates a convincing local wake without the
 * memory cost and compatibility risks of a multi-buffer fluid solver.
 */
export function createAmbientFlow(
  canvas: HTMLCanvasElement,
  theme: "day" | "night",
) {
  const context = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
    stencil: false,
  });

  if (!context) return null;
  const gl = context as WebGLRenderingContext;
  const rendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const rendererName = rendererInfo
    ? String(gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL))
    : "";
  const isSoftwareRenderer = /swiftshader|llvmpipe|software/i.test(
    rendererName,
  );
  const fragmentSource = isSoftwareRenderer
    ? FRAGMENT_SHADER_SOURCE.replace("index < 3", "index < 2")
    : FRAGMENT_SHADER_SOURCE;
  canvas.dataset.ambientRenderer = isSoftwareRenderer ? "software" : "hardware";

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Unable to create the ambient-flow program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) ?? "Unknown program error";
    gl.deleteProgram(program);
    throw new Error(info);
  }

  const buffer = gl.createBuffer();
  if (!buffer) {
    gl.deleteProgram(program);
    throw new Error("Unable to create the ambient-flow geometry.");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const position = gl.getAttribLocation(program, "a_position");
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const pointer = gl.getUniformLocation(program, "u_pointer");
  const trailAUniform = gl.getUniformLocation(program, "u_trail_a");
  const trailBUniform = gl.getUniformLocation(program, "u_trail_b");
  const pointerSpeed = gl.getUniformLocation(program, "u_pointer_speed");
  const pointerDown = gl.getUniformLocation(program, "u_pointer_down");
  const wakeStrength = gl.getUniformLocation(program, "u_wake_strength");
  const time = gl.getUniformLocation(program, "u_time");
  const lightMode = gl.getUniformLocation(program, "u_light_mode");

  let disposed = false;
  let contextLost = false;
  let frame = 0;
  let previousFrame = 0;
  let minimumFrameInterval = 0;
  const cursor = {
    x: 0.68,
    y: 0.3,
    targetX: 0.68,
    targetY: 0.3,
    speed: 0,
    targetSpeed: 0,
    wakeStrength: 0,
    pressure: 0,
    targetPressure: 0,
  };
  const trailA = { x: cursor.x, y: cursor.y };
  const trailB = { x: cursor.x, y: cursor.y };

  function resize() {
    const viewportWidth = Math.max(window.innerWidth, 1);
    const viewportHeight = Math.max(window.innerHeight, 1);
    const isCompactViewport = viewportWidth < 768;
    const qualityCap = isSoftwareRenderer
      ? isCompactViewport
        ? 0.36
        : 0.4
      : isCompactViewport
        ? 0.6
        : 0.72;
    const maximumWidth = isSoftwareRenderer ? 640 : 1152;
    const maximumHeight = isSoftwareRenderer ? 360 : 648;
    const scale = Math.min(
      window.devicePixelRatio || 1,
      qualityCap,
      maximumWidth / viewportWidth,
      maximumHeight / viewportHeight,
    );
    const width = Math.max(1, Math.floor(viewportWidth * scale));
    const height = Math.max(1, Math.floor(viewportHeight * scale));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    gl.viewport(0, 0, width, height);
    // Desktop follows requestAnimationFrame at the display refresh rate.
    // Compact devices retain a 30 FPS ceiling to protect battery and thermals.
    minimumFrameInterval = isCompactViewport ? 1000 / 30 : 0;
  }

  function updatePointer(event: PointerEvent) {
    const nextX = Math.min(Math.max(event.clientX / Math.max(window.innerWidth, 1), 0), 1);
    const nextY = Math.min(Math.max(event.clientY / Math.max(window.innerHeight, 1), 0), 1);
    const aspect = Math.max(window.innerWidth, 1) / Math.max(window.innerHeight, 1);
    const distance = Math.hypot((nextX - cursor.targetX) * aspect, nextY - cursor.targetY);

    cursor.targetX = nextX;
    cursor.targetY = nextY;
    // The pressure dimple should feel attached to the physical pointer. The
    // two trail samples below are the only intentionally delayed positions.
    cursor.x = nextX;
    cursor.y = nextY;
    cursor.targetSpeed = Math.max(cursor.targetSpeed, Math.min(distance * 11, 1));
    cursor.wakeStrength = Math.max(
      cursor.wakeStrength,
      Math.min(distance * 8, 1),
    );
  }

  function onPointerMove(event: PointerEvent) {
    updatePointer(event);
  }

  function onPointerDown(event: PointerEvent) {
    updatePointer(event);
    cursor.targetPressure = 1;
    cursor.targetSpeed = Math.max(cursor.targetSpeed, 0.72);
  }

  function onPointerUp() {
    cursor.targetPressure = 0;
  }

  function onContextLost(event: Event) {
    event.preventDefault();
    contextLost = true;
    canvas.dataset.ambientState = "unavailable";
    window.cancelAnimationFrame(frame);
    frame = 0;
  }

  function render(timestamp: number) {
    if (disposed || contextLost || document.hidden) {
      frame = 0;
      return;
    }

    if (
      minimumFrameInterval > 0 &&
      timestamp - previousFrame < minimumFrameInterval
    ) {
      frame = window.requestAnimationFrame(render);
      return;
    }

    const frameDelta = previousFrame === 0
      ? 1 / 60
      : Math.min((timestamp - previousFrame) * 0.001, 0.1);
    previousFrame = timestamp;
    trailA.x += (cursor.x - trailA.x) * 0.09;
    trailA.y += (cursor.y - trailA.y) * 0.09;
    trailB.x += (trailA.x - trailB.x) * 0.055;
    trailB.y += (trailA.y - trailB.y) * 0.055;
    cursor.speed += (cursor.targetSpeed - cursor.speed) * 0.2;
    cursor.targetSpeed *= 0.72;
    cursor.wakeStrength = Math.max(
      cursor.speed,
      cursor.wakeStrength * Math.exp(-frameDelta * 2.15),
    );
    cursor.pressure += (cursor.targetPressure - cursor.pressure) * 0.16;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform2f(pointer, cursor.x, cursor.y);
    gl.uniform2f(trailAUniform, trailA.x, trailA.y);
    gl.uniform2f(trailBUniform, trailB.x, trailB.y);
    gl.uniform1f(pointerSpeed, cursor.speed);
    gl.uniform1f(pointerDown, cursor.pressure);
    gl.uniform1f(wakeStrength, cursor.wakeStrength);
    gl.uniform1f(time, timestamp * 0.001);
    gl.uniform1f(lightMode, theme === "day" ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    frame = window.requestAnimationFrame(render);
  }

  function onVisibilityChange() {
    if (!disposed && !contextLost && !document.hidden && frame === 0) {
      previousFrame = 0;
      frame = window.requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerUp, { passive: true });
  canvas.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", onVisibilityChange);
  frame = window.requestAnimationFrame(render);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };
}
