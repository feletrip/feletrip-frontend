export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left glow */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-primary/30 blur-[140px] rounded-full" />

      {/* Bottom-right glow */}
      <div className="absolute -bottom-1/2 right-20 w-1/2 h-160 bg-primary/20 blur-[160px] rounded-full" />

      {/* <div
        className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(0,0,0,0)_99%,currentColor_99%),linear-gradient(to_bottom,rgba(0,0,0,0)_99%,currentColor_99%)] bg-size-[40px_40px] text-foreground/20 rounded-xl overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
        }}
      /> */}
    </div>
  );
}
