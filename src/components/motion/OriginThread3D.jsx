import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

// The hero thread sits at the very top of the homepage, so it starts
// visible - but once the visitor scrolls the rest of the page, this WebGL
// scene has no reason to keep redrawing every frame. `frameloop="never"`
// stops R3F's render loop outright rather than merely skipping work inside
// it, so an off-screen thread costs nothing until it scrolls back into view.
function useIsVisible(ref) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

// Reads the live CSS custom property rather than duplicating its hex value,
// so this stays in sync with variables.css instead of drifting from it -
// the same discipline GlobalReach.jsx already applies to its own palette.
function cssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

// One trunk, three branches - the flat `.origin-fork` SVG's own composition
// (see OriginSequence.jsx), rebuilt with real depth instead of copying
// AURA's abstract blob/rings/shards. Each branch is a gentle curve rather
// than a straight segment (matching the corridor/seam curves used
// elsewhere), given a small permanent Z offset so the slow idle turn below
// reveals actual depth between the three worlds rather than three flat
// lines that happen to be tinted differently.
function useThreadGeometry() {
  return useMemo(() => {
    const trunk = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(0, 0.7, 0.05),
      new THREE.Vector3(0, 0.15, 0),
    ]).getPoints(24);

    const branch = (endX, endZ) =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.15, 0),
        new THREE.Vector3(endX * 0.45, -0.55, endZ * 0.6),
        new THREE.Vector3(endX, -1.35, endZ),
      ]).getPoints(24);

    return {
      trunk,
      international: branch(-1.35, 0.4),
      eventus: branch(0, -0.4),
      luxe: branch(1.35, 0.4),
    };
  }, []);
}

function ThreadGroup() {
  const groupRef = useRef(null);
  const paths = useThreadGeometry();

  const gold = cssVar("--gold", "#b8975a");
  const colors = useMemo(
    () => ({
      international: cssVar("--accent-international", "#2c4a63"),
      eventus: cssVar("--accent-eventus", "#8a3b34"),
      luxe: cssVar("--accent-luxe", "#2f5240"),
    }),
    []
  );

  // Slow and small on purpose: enough turn to read the three branches as
  // occupying different depths, never enough to feel like a decoration
  // spinning for its own sake. Pointer influence is clamped to the same
  // small range as the idle drift so a fast mouse pass never overshoots it.
  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    const idle = Math.sin(t * 0.15) * 0.1;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, idle + state.pointer.x * 0.16, 0.04);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, state.pointer.y * -0.08, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Line points={paths.trunk} color={gold} lineWidth={1.6} />
      <Sphere args={[0.045, 16, 16]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.35} roughness={0.4} />
      </Sphere>

      {[
        ["international", colors.international],
        ["eventus", colors.eventus],
        ["luxe", colors.luxe],
      ].map(([key, color]) => {
        const pts = paths[key];
        const end = pts[pts.length - 1];
        return (
          <group key={key}>
            <Line points={pts} color={color} lineWidth={1.4} />
            <Sphere args={[0.038, 16, 16]} position={end}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
}

// Mounted only for desktop, motion-enabled, WebGL-capable visitors (see
// OriginSequence.jsx) - everyone else keeps the original flat SVG fork, so
// this never becomes the only way to see "one origin, multiple worlds."
export default function OriginThread3D() {
  const gold = cssVar("--gold", "#b8975a");
  const wrapperRef = useRef(null);
  const visible = useIsVisible(wrapperRef);

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.4], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={visible ? "always" : "never"}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.75} />
        <pointLight position={[1.5, 1.8, 2.6]} intensity={22} color={gold} />
        <ThreadGroup />
      </Canvas>
    </div>
  );
}
