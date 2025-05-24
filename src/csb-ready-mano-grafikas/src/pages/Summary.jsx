import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Summary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/naudotojas/suvestine");
        setSummary(res.data);
      } catch (err) {
        toast.error("Nepavyko gauti suvestinės");
      }
    };
    fetch();
  }, []);

  if (!summary) return <div className="p-4">Kraunama...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#10403B] mb-4">
        Valandų suvestinė
      </h2>
      <div className="bg-white rounded-xl shadow p-4 space-y-2 text-sm">
        <div>
          <b>Mėnesis:</b> {summary.menuo}
        </div>
        <div>
          <b>Planuota valandų:</b> {summary.planuota}
        </div>
        <div>
          <b>Faktinės valandos:</b> {summary.faktas}
        </div>
        <div>
          <b>Balansas:</b> {summary.faktas - summary.planuota}
        </div>
        <div>
          <b>Viršvalandžiai:</b> {summary.virsvalandziai}
        </div>
        <div>
          <b>Neišdirbtos:</b> {summary.neisdarbos}
        </div>
        <div>
          <b>Pamainų keitimai:</b> {summary.keitimai}
        </div>
        <div>
          <b>Keitimai atmesti:</b> {summary.atsisakymai}
        </div>
      </div>
    </div>
  );
}
