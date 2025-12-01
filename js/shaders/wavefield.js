/* -------------------------------------------------------
   WAVEFIELD.JS — Interference Field Background Shader
------------------------------------------------------- */

function initWavefield() {
    const canvas = document.getElementById("wavefield-canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    function draw() {
        const w = canvas.width;
        const h = canvas.height;

        const img = ctx.createImageData(w, h);
        const data = img.data;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {

                // Normalize coordinates
                const nx = x / w;
                const ny = y / h;

                // Interference formula
                const v =
                    Math.sin((nx * 12.0) + t * 0.002) +
                    Math.sin((ny * 10.0) - t * 0.002) +
                    Math.sin((nx * 6.0) + (ny * 6.0) + t * 0.001);

                // Normalize to [0,1]
                const intensity = (v + 3.0) / 6.0;

                // Cerulean-gradient with slight gold highlight
                const r = intensity * 10;            // subtle red tint
                const g = intensity * 40;            // teal mids
                const b = intensity * 90 + 30;       // cerulean glow

                const idx = (y * w + x) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255 * 0.15;          // ~15% opacity (very subtle)
            }
        }

        ctx.putImageData(img, 0, 0);
        t += 1;

        requestAnimationFrame(draw);
    }

    draw();
}
