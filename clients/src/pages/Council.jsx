import { useNavigate, useParams } from "react-router-dom";
import CouncilMemberCard from "../components/CouncilMemberCard";
import councilData from "../api/council.json";

function Council() {
  const { year } = useParams();
  const navigate = useNavigate();

  const selectedYear = year || "2026-27";
  const council = councilData[selectedYear];

  if (!council) {
    return (
      <div className="min-h-screen p-10 text-white">
        <h1 className="text-2xl font-bold">Council not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pt-32 pb-16 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-4xl font-bold">AAIRO Council</h1>

        <p className="mt-3 text-white/60">
          Meet the team behind AAIRO
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <button
            onClick={() => navigate("/council/2026-27")}
            className={
              selectedYear === "2026-27"
                ? "rounded-full bg-white px-5 py-2 text-black"
                : "rounded-full bg-white/10 px-5 py-2"
            }
          >
            2026-27
          </button>

          <button
            onClick={() => navigate("/council/2025-26")}
            className={
              selectedYear === "2025-26"
                ? "rounded-full bg-white px-5 py-2 text-black"
                : "rounded-full bg-white/10 px-5 py-2"
            }
          >
            2025-26
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {council.members.map((member, index) => (
          <CouncilMemberCard
            key={index}
            member={member}
          />
        ))}
      </div>
    </div>
  );
}

export default Council;