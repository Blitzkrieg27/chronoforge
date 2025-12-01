/* -------------------------------------------------------
   TORUS.JS — Quantum Torus Hero Shader (Three.js)
------------------------------------------------------- */

function initTorus() {
    const canvas = document.getElementById("torus-canvas");
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    // Geometry
    const geometry = new THREE.TorusGeometry(1, 0.33, 64, 128);

    // Material — Matte Cerulean Diffuse
    const material = new THREE.MeshStandardMaterial({
        color: 0x0A2A43,      // Deep cerulean
        roughness: 0.95,      // Matte
        metalness: 0.0
    });

    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Lighting (subtle)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(2, 2, 3);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
    light2.position.set(-2, -1, -2);
    scene.add(light2);

    // Gold Fresnel Rim Shader
    const fresnelUniforms = {
        color: { value: new THREE.Color(0xd4af37) },
        power: { value: 2.0 },
    };

    const fresnelMaterial = new THREE.ShaderMaterial({
        uniforms: fresnelUniforms,
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewDir;

            void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewDir = normalize(-mvPosition.xyz);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float power;

            varying vec3 vNormal;
            varying vec3 vViewDir;

            void main() {
                float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), power);
                vec3 rim = color * fresnel;
                gl_FragColor = vec4(rim, fresnel);
            }
        `,
        transparent: true
    });

    const fresnelMesh = new THREE.Mesh(geometry, fresnelMaterial);
    scene.add(fresnelMesh);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.002;
        torus.rotation.y += 0.003;

        fresnelMesh.rotation.copy(torus.rotation);

        renderer.render(scene, camera);
    }

    animate();

    // Responsive resize
    window.addEventListener("resize", () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}
