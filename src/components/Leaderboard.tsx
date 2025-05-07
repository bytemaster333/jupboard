import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

type Contributor = {
  id: string;
  wallet_address: string;
  github_username: string;
  score: number;
};

const Leaderboard = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      const { data, error } = await supabase
        .from("contributors")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.error("Error fetching leaderboard:", error.message);
      } else {
        setContributors(data as Contributor[]);
      }
      setLoading(false);
    };

    fetchContributors();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading leaderboard...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow text-black">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Top Contributors</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">#</th>
            <th className="p-2">GitHub</th>
            <th className="p-2">Wallet</th>
            <th className="p-2 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor, index) => (
            <tr key={contributor.id} className="border-b hover:bg-gray-100">
              <td className="p-2">{index + 1}</td>
              <td className="p-2 font-mono">@{contributor.github_username}</td>
              <td className="p-2 font-mono text-xs truncate">{contributor.wallet_address}</td>
              <td className="p-2 text-right font-semibold">{contributor.score}</td>
              <td className="p-2 font-mono">
                <Link
                  to={`/profile/${contributor.github_username}`}
                  className="text-blue-600 underline"
                >
                  @{contributor.github_username}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
