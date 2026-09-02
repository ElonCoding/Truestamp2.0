'use client';

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Violet Ambient Glow */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 80%)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Mid Right Cyan/Indigo Glow */}
      <div 
        className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full opacity-35 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 80%)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Bottom Deep Violet Glow */}
      <div 
        className="absolute bottom-10 left-1/3 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-[160px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(79, 70, 229, 0.12) 50%, transparent 80%)',
          transform: 'translate3d(0,0,0)',
        }}
      />
    </div>
  );
}
