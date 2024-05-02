import {W as P, O as w, d as x, V as I, B as v, c as T, e as z, I as D, r as o, f as E, A as O, Q as j} from "./math-utils-1c6b45c8.js";
function g(e, s) {
    if (s.isOrthographicCamera)
        return Math.abs(s.top - s.bottom);
    const r = s.position.z;
    e < r ? e -= r : e += r;
    const A = s.fov * Math.PI / 180;
    return 2 * Math.tan(A / 2) * Math.abs(e)
}
function q(e, s) {
    return s.isOrthographicCamera ? Math.abs(s.right - s.left) : g(e, s) * s.aspect
}
const L = document.querySelector("#app")
  , a = new P({
    canvas: L,
    background: "#242324",
    showFps: !1,
    orbitControls: !0,
    orthographic: !0
});
window.webgl = a;
const p = 50
  , t = new w
  , d = new x
  , i = q(0, a.camera)
  , c = g(0, a.camera)
  , m = document.createElement("video");
m.src = "./assets/Cube.mp4";
m.muted = !0;
m.loop = !0;
m.play();
const Q = new I(m)
  , h = new v(.7,.4,.55);
h.clearGroups();
const b = [];
for (let e = 0; e < 2; e++) {
    const s = new T({
        camera: a.camera,
        texture: Q,
        color: a.background,
        cover: !0,
        transparent: !0
    });
    b.push(s),
    h.addGroup(0, 1 / 0, e)
}
z(h, p);
const n = new D(h,b,p);
a.scene.add(n);
for (let e = 0; e < p; e++)
    e === 0 ? (t.position.set(0, 0, -i / 2 - .15),
    t.scale.set(i * 8, c * 8, 1)) : e === 1 ? (t.position.set(0, c / 2 + .5, 0),
    t.scale.set(c * 8, 1, i * 8)) : e < p * (1 / 3) ? (t.position.x = o(-i / 2, i / 2),
    t.position.y = o(-c / 2, c / 2),
    t.position.z = -i / 2 + .3,
    t.scale.x = o(1, 4),
    t.scale.y = o(1, 4),
    t.scale.z = o(1, 4)) : e < p * (2 / 3) ? (t.position.x = o(-i / 2, i / 2),
    t.position.y = c / 2 + .3,
    t.position.z = o(-i / 2, i / 2),
    t.scale.x = o(1, 4),
    t.scale.y = o(1, 4),
    t.scale.z = o(1, 4)) : (t.position.x = o(-i / 2, i / 2),
    t.position.y = o(-c / 2, c / 2),
    t.position.z = o(-i / 2, i / 2),
    t.scale.x = o(.5, 3),
    t.scale.y = o(.5, 3),
    t.scale.z = o(.5, 3)),
    t.updateMatrix(),
    n.setMatrixAt(e, t.matrix),
    n.material[0].projectInstanceAt(e, n, t.matrix);
const k = new E().copy(a.camera.position);
a.camera.position.set(0, -4, 0);
a.camera.up.set(-1, 0, 0);
a.camera.lookAt(0, 0, 0);
for (let e = 0; e < p; e++)
    n.getMatrixAt(e, d),
    n.material[1].projectInstanceAt(e, n, d);
a.camera.position.copy(k);
a.camera.up.copy(w.DEFAULT_UP);
a.camera.lookAt(0, 0, 0);
const C = n.quaternion.clone();
t.applyMatrix4(new x);
t.rotateX(-Math.PI / 2);
t.rotateY(Math.PI / 2);
const G = t.quaternion.clone()
  , y = new j
  , S = 1
  , f = 1500;
let M = 0
  , l = !1
  , u = !1;
a.onUpdate((e,s)=>{
    const r = Math.cos(M) * .5 + .5;
    r > .9999 && !l && !u && (l = !0,
    u = !0,
    setTimeout(()=>l = !1, f),
    setTimeout(()=>u = !1, f + 150)),
    r < 1e-4 && !l && !u && (l = !0,
    u = !0,
    setTimeout(()=>l = !1, f),
    setTimeout(()=>u = !1, f + 150)),
    !l && (M += e * S,
    y.copy(C).slerp(G, r),
    n.quaternion.copy(y))
}
);
const U = new O("#ffffff",1);
a.scene.add(U);
a.start();
