import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function Calendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/grafikas");
        setDays(res.data);
      } catch (err) {
        toast.error("Nepavyko gauti grafiko");
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#10403B] mb-4">Mano grafikas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {days.map((d, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-3">
            <div className="text-sm text-[#4C5958] mb-1">
              {format(new Date(d.data), "yyyy-MM-dd (EEEE)")}
            </div>
            <div className="font-semibold">{d.pamaina}</div>
            <div className="text-sm text-gray-500">{d.kolegos.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
