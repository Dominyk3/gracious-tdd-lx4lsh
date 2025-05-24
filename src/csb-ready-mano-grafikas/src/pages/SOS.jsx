import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function SOS() {
  const [sosList, setSosList] = useState([]);

  const fetchSOS = async () => {
    try {
      const res = await axios.get("/sos");
      setSosList(res.data);
    } catch (err) {
      toast.error("Nepavyko gauti SOS kvietimų");
    }
  };

  const respond = async (id, gali) => {
    try {
      await axios.patch("/sos", { id, gali });
      toast.success("Atsakymas išsiųstas");
      fetchSOS();
    } catch (err) {
      toast.error("Klaida siunčiant atsakymą");
    }
  };

  useEffect(() => {
    fetchSOS();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#10403B] mb-4">SOS kvietimai</h2>
      {sosList.length === 0 ? (
        <p>Nėra aktyvių SOS kvietimų.</p>
      ) : (
        <div className="grid gap-4">
          {sosList.map((sos) => (
            <div key={sos.id} className="bg-white rounded-xl shadow p-4">
              <div className="text-sm text-[#4C5958] mb-2">
                {format(new Date(sos.data), "yyyy-MM-dd (EEEE)")} –{" "}
                {sos.pamaina}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => respond(sos.id, true)}
                  className="bg-[#127369] text-white px-3 py-1 rounded hover:bg-[#10403B]"
                >
                  Galiu dirbti
                </button>
                <button
                  onClick={() => respond(sos.id, false)}
                  className="bg-[#BFBFBF] text-black px-3 py-1 rounded hover:bg-[#8AA6A3]"
                >
                  Negaliu
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
