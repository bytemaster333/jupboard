import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Contributor = {
  wallet_address: string;
  github_username: string;
  score: number;
};

type GitHubInfo = {
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

const Profile = () => {
  const { github } = useParams();
  const [profile, setProfile] = useState<Contributor | null>(null);
  const [githubInfo, setGitHubInfo] = useState<GitHubInfo | null>(null);

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
      }
    };

    const fetchGitHubInfo = async () => {
      const res = await fetch(`https://api.github.com/users/${github}`);
      if (res.ok) {
        const data = await res.json();
        setGitHubInfo(data);
      }
    };

    fetchProfile();
    fetchGitHubInfo();
  }, [github]);

  if (!profile || !githubInfo) {
    return <p className="text-center mt-20 text-gray-300">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white text-black rounded-lg shadow p-6 mt-10">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={githubInfo.avatar_url}
          alt="GitHub Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">@{profile.github_username}</h2>
          <a
            className="text-blue-600 underline text-sm"
            href={githubInfo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile ↗
          </a>
        </div>
      </div>

      <p><strong>Wallet:</strong> <span className="font-mono text-sm">{profile.wallet_address}</span></p>
      <p className="mt-2"><strong>Score:</strong> {profile.score}</p>

      <div className="mt-4 border-t pt-4">
        <p><strong>Public Repositories:</strong> {githubInfo.public_repos}</p>
        <p><strong>Followers:</strong> {githubInfo.followers}</p>
      </div>
    </div>
  );
};

export default Profile;
