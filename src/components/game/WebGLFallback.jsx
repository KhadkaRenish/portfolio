import RecruiterMode from "../RecruiterMode";

function WebGLFallback() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center">
        <p className="section-kicker">3D Mission Unavailable</p>
        <h1 className="mt-4 text-4xl font-black">3D Mission Mode is not supported on this device.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          WebGL could not be initialized, so the clean recruiter portfolio is shown automatically.
        </p>
      </div>
      <RecruiterMode />
    </div>
  );
}

export default WebGLFallback;
