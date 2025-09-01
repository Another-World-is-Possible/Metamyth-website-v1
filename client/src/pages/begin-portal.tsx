import { useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

export default function BeginPortal() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TEMP STUB: Simulate password check
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate network delay
    if (input === "testpassword") { // replace with your test password
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
    // --- Restore this when ready:
    // const { data, error: fnError } = await supabase.functions.invoke("validate-portal-password", {
    //   body: { password: input }
    // });
    // setLoading(false);
    // if (fnError) {
    //   setError("Server error. Please try again.");
    //   return;
    // }
    // if (data?.valid) {
    //   setUnlocked(true);
    //   setError("");
    // } else {
    //   setError("Incorrect password.");
    // }
  };

  if (unlocked) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-red-800/30 rounded-2xl shadow-lg p-8 max-w-md w-full mx-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400 tracking-wide">METAMYTH Portal</h1>
        <h2 className="text-lg text-center mb-8 text-gray-300">Welcome to the Portal!</h2>
        {/* Place your protected content here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black">
      <div className="bg-white/10 backdrop-blur-md border border-red-800/30 rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400 tracking-wide">METAMYTH Portal</h1>
        <h2 className="text-lg text-center mb-8 text-gray-300">Access Required</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Enter Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
              placeholder="Password required..."
              required
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-gray-900 font-bold rounded-lg shadow-md hover:from-yellow-400 hover:to-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Checking..." : "ENTER PORTAL"}
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          This is a private portal for authorized users only.
        </p>
      </div>
    </div>
  );
}