import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getGitHubPRScore } from "../utils/github";

type Contributor = {
  wallet_address: string;
  github_username: string;
  score: number;
  merged_pr_count: number;
  last_refreshed: string;
};

type GitHubInfo = {
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

const getBadge = (score: number) => {
  if (score >= 90) return { label: "Gold", emoji: "🥇", color: "text-yellow-400" };
  if (score >= 60) return { label: "Silver", emoji: "🥈", color: "text-gray-300" };
  if (score >= 30) return { label: "Bronze", emoji: "🥉", color: "text-orange-400" };
  return { label: "Rookie", emoji: "🎯", color: "text-blue-400" };
};

const Profile = () => {
  const { github } = useParams();
  const [profile, setProfile] = useState<Contributor | null>(null);
  const [githubInfo, setGithubInfo] = useState<GitHubInfo | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [previousScore, setPreviousScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("contributors")
        .select("*")
        .eq("github_username", github)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProfile(data);
        setPreviousScore(data?.score ?? null);
      }
    };

    const fetchGitHubInfo = async () => {
      const res = await fetch(`https://api.github.com/users/${github}`);
      if (res.ok) {
        const data = await res.json();
        setGithubInfo(data);
      }
    };

    fetchProfile();
    fetchGitHubInfo();
  }, [github]);

  const handleRefreshScore = async () => {
    if (!profile) return;

    setRefreshing(true);
    const score = await getGitHubPRScore(profile.github_username);
    const merged_pr_count = score / 10;

    const { error } = await supabase
      .from("contributors")
      .update({
        score,
        merged_pr_count,
        last_refreshed: new Date().toISOString(),
      })
      .eq("github_username", profile.github_username);

    if (!error) {
      setPreviousScore(profile.score);
      setProfile({ ...profile, score, merged_pr_count });
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    }

    setRefreshing(false);
  };

  if (!profile || !githubInfo) {
    return <p className="text-center mt-20 text-gray-300">Loading profile...</p>;
  }

  const badge = getBadge(profile.score);
  const scoreDiff = previousScore !== null ? profile.score - previousScore : null;

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-xl p-8 mt-12">
      {/* Avatar & Name */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={githubInfo.avatar_url}
          alt="GitHub Avatar"
          className="w-20 h-20 rounded-full border-2 border-purple-400"
        />
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2 relative group">
            @{profile.github_username}
            <span className={`text-2xl ${badge.color} cursor-pointer`} title={badge.label}>
              {badge.emoji}
            </span>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-800 text-sm text-white px-3 py-2 rounded-lg shadow-lg w-52 z-10">
              <div className="font-semibold mb-1">{badge.label} Contributor</div>
              <div className="text-gray-300">
                {badge.label === "Gold" && "Outstanding contributor with 90+ score"}
                {badge.label === "Silver" && "Consistent contributor with 60+ score"}
                {badge.label === "Bronze" && "Growing contributor with 30+ score"}
                {badge.label === "Rookie" && "New contributor – keep going!"}
              </div>
            </div>
          </h2>
          <a
            className="text-blue-400 underline text-sm"
            href={githubInfo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile ↗
          </a>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mb-6 text-center">
        <button
          onClick={handleRefreshScore}
          disabled={refreshing}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded shadow font-semibold transition"
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh My Score"}
        </button>
        {updated && (
          <p className="text-green-400 mt-2 font-medium">
            ✅ Score updated successfully!
          </p>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <h3 className="text-sm text-gray-400 mb-1">Wallet</h3>
          <p className="font-mono text-sm break-all">{profile.wallet_address}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <h3 className="text-sm text-gray-400 mb-1">Score</h3>
          <p className="text-xl font-bold text-purple-300">
            {profile.score} pts
            <span className="block text-sm text-gray-400">
              ({profile.merged_pr_count} merged PR{profile.merged_pr_count === 1 ? "" : "s"})
            </span>
            {scoreDiff !== null && scoreDiff !== 0 && (
              <span className={`block text-sm mt-1 ${scoreDiff > 0 ? "text-green-400" : "text-red-400"}`}>
                {scoreDiff > 0 ? "▲" : "▼"} {Math.abs(scoreDiff)} pts since last refresh
              </span>
            )}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <h3 className="text-sm text-gray-400 mb-1">Followers</h3>
          <p className="text-lg font-semibold">{githubInfo.followers}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <h3 className="text-sm text-gray-400 mb-1">Public Repositories</h3>
          <p className="text-lg font-semibold">{githubInfo.public_repos}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-inner md:col-span-2">
          <h3 className="text-sm text-gray-400 mb-1">Joined</h3>
          <p className="text-md font-medium text-gray-100">
            {new Date(profile.last_refreshed).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Rozet Koleksiyonu */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
        <h3 className="text-md font-bold text-white mb-3">🏅 Badge Collection</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl">🎯</p>
            <p className="text-sm mt-1 text-blue-400">Rookie</p>
          </div>
          <div>
            <p className="text-2xl">🥉</p>
            <p className="text-sm mt-1 text-orange-400">Bronze</p>
          </div>
          <div>
            <p className="text-2xl">🥈</p>
            <p className="text-sm mt-1 text-gray-300">Silver</p>
          </div>
          <div>
            <p className="text-2xl">🥇</p>
            <p className="text-sm mt-1 text-yellow-400">Gold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
