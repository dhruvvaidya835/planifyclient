import React, { useState } from "react";
import Mermaid from "./components/Mermaid";

export default function App() {
  const [form, setForm] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    members: "",
    features: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://planifyserver-g14g.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert("Error generating plan");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight text-center">
          Planify AI by Dhruv
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Generate clean Gantt & Waterfall diagrams using AI.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleGenerate}
          className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm"
        >
          <input
            name="projectName"
            value={form.projectName}
            onChange={onChange}
            placeholder="Project name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <div className="flex gap-3">
            <input
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              type="date"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              type="date"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <textarea
            name="members"
            value={form.members}
            onChange={onChange}
            placeholder="Members (comma separated)"
            className="w-full border border-gray-300 p-3 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 transition"
          />

          <textarea
            name="features"
            value={form.features}
            onChange={onChange}
            placeholder="Features / Modules (one per line)"
            className="w-full border border-gray-300 p-3 rounded-lg h-28 focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg shadow-md disabled:bg-blue-300"
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </form>

        {/* RESULTS */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Gantt Chart</h2>
              <div className="border p-4 rounded-lg mt-3 bg-gray-50">
                <Mermaid chart={result.gantt} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Waterfall Diagram</h2>
              <div className="border p-4 rounded-lg mt-3 bg-gray-50">
                <Mermaid chart={result.waterfall} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
