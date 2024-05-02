import {W as A, a as W, V as h, G as v, B as E, r as o, P as z, b as G, c as L, M as S, T as P, D as k, A as C} from "./math-utils-1c6b45c8.js";
const H = document.querySelector("#app")
  , t = new A({
    canvas: H,
    showFps: !0,
    orbitControls: !0
});
window.webgl = t;
const x = new W;
x.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(x.domElement);
const s = document.createElement("video");
s.src = "./assets/Squares_VP9.webm";
s.muted = !0;
s.loop = !0;
s.play();
const N = new h(s)
  , c = new v
  , U = 200;
for (let i = 0; i < U; i++) {
    const w = new E(o(.8, .5),o(.51, .60),(.740,
    .59))
      , e = 1
      , u = window.innerWidth / e * window.devicePixelRatio
      , f = window.innerHeight / e * window.devicePixelRatio;
    let M;
    for (let a = 0; a < e; a++)
        for (let m = 0; m < e; m++) {
            const n = new z(u * 2 / f * 2);
            n.viewport = new G(Math.floor(m * u),Math.floor(a * f),Math.ceil(u),Math.ceil(f)),
            n.position.x = 2- m / e,
            n.position.y = -1 / (a / e),
            n.position.z = 1 + a / e,
            n.position.multiplyScalar(6),
            n.lookAt(5, -5, 0),
            n.updateMatrixWorld()
        }
    M = t.camera,
    M.position.z = 2;
    const b = new L({
        camera: t.camera,
        texture: N,
        color: "#1b1a1a",
        textureScale: 4.4
    })
      , r = new S(w,b);
    r.position.x = o(-1, 1),
    r.position.y = o(-1, 1),
    r.position.z = o(-1, 1),
    b.project(r),
    c.add(r)
}
let p;
p = t.camera;
p.position.z = 1;
const d = document.createElement("video");
d.src = "./assets/Squares_VP9.webm".
d.muted = !0;
d.loop = !0;
d.play();
const j = new h(d)
  , g = new L({
    camera2: t.camera,
    texture2: j,
    color: "#1c1c1c",
    textureScale: 0.6
})
  , D = new v
  , I = 103;
for (let i = 0; i < I; i++) {
    const w = new E(o(.6, -.5),o(-.51, .5),o(-.51, .5))
      , e = new S(w,g);
    p.position.set(6, 1, 4),
    p.lookAt(3, 3, 0),
    e.position.x = o(-2, 2.17),
    e.position.y = o(-1.1, 1),
    e.position.z = o(-1.9, 1.5),
    g.project(e),
    D.add(e)
}
let y;
y = t.camera;
const l = document.createElement("video");
l.src = "./assets/Cube.webm";
l.muted = !0;
l.loop = !0;
l.play();
const R = new h(l);
t.scene.add(c);
new P;
t.scene.background = R;
t.scene.background.receiveShadow = !0;
y.position.set(6, 1, -2);
y.lookAt(3, 0, 2);
const T = new k("#ffffff",.8);
T.position.set(0, 5, 9);
t.scene.add(T);
const V = new C("#fff",.79);
t.scene.add(V);
c.rotation.y = Math.PI / 1;
t.onUpdate(()=>{
    c.rotation.y -= 23.7;
}
);
t.start();
