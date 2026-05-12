export function SceneLighting() {
  return (
    <>
      <color attach="background" args={["#090b10"]} />
      <fog attach="fog" args={["#090b10", 7, 18]} />
      <ambientLight intensity={0.52} />
      <pointLight position={[0, 1.8, 3]} intensity={1.2} color="#bff6e4" />
      <pointLight position={[-3, -2, -2]} intensity={0.45} color="#7aa7ff" />
    </>
  );
}
