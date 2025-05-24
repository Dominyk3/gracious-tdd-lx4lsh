import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const ym = format(currentDate, "yyyy-MM");
      const res = await axios.get(`/grafikas/valandos?menuo=${ym}`);
      setData(res.data);
    } catch (err) {
      toast.error("Nepavyko gauti duomenų");
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const ym = format(currentDate, "yyyy-MM");
      await axios.post("/grafikas", { menuo: ym });
      toast.success("Grafikas sugeneruotas");
      fetchData();
    } catch (err) {
      toast.error("Generavimas nepavyko");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#10403B] mb-4">
        Vadovo skydelis: {format(currentDate, "yyyy MMMM")}
      </h2>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mb-4 bg-[#10403B] text-white px-4 py-2 rounded hover:bg-[#127369]"
      >
        {loading ? "Generuojama..." : "Generuoti grafiką"}
      </button>
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Vardas</th>
              <th>Planuota</th>
              <th>Faktas</th>
              <th>Balansas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr key={i} className="border-t">
                <td>{u.vardas}</td>
                <td className="text-center">{u.planuotaValandu}</td>
                <td className="text-center">{u.faktinesValandos}</td>
                <td className="text-center">
                  {u.faktinesValandos - u.planuotaValandu}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
