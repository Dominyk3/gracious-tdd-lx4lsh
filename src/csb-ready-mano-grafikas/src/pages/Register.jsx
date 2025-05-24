import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    vardas: "",
    el_pastas: "",
    slaptazodis: "",
    padalinys: "C1.1",
    noriSos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", form);
      toast.success("Registracija sėkminga – dabar prisijunk!");
    } catch (err) {
      toast.error("Registracija nepavyko");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#8AA6A3]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-[#10403B] mb-4">Registracija</h2>
        <input
          name="vardas"
          placeholder="Vardas"
          className="w-full mb-3 p-2 rounded border"
          onChange={handleChange}
          required
        />
        <input
          name="el_pastas"
          type="email"
          placeholder="El. paštas"
          className="w-full mb-3 p-2 rounded border"
          onChange={handleChange}
          required
        />
        <input
          name="slaptazodis"
          type="password"
          placeholder="Slaptažodis"
          className="w-full mb-3 p-2 rounded border"
          onChange={handleChange}
          required
        />
        <select
          name="padalinys"
          className="w-full mb-3 p-2 rounded border"
          onChange={handleChange}
          required
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const code = `C1.${i + 1}`;
            return (
              <option key={code} value={code}>
                {code}
              </option>
            );
          })}
        </select>
        <label className="flex items-center mb-4 text-sm text-[#10403B]">
          <input
            type="checkbox"
            name="noriSos"
            onChange={handleChange}
            className="mr-2"
          />
          Noriu būti SOS rezerve
        </label>
        <button
          type="submit"
          className="w-full bg-[#10403B] text-white py-2 rounded hover:bg-[#127369]"
        >
          Registruotis
        </button>
      </form>
    </div>
  );
}
