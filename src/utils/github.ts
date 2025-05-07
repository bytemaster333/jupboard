export async function getGitHubPRScore(username: string): Promise<number> {
    const url = `https://api.github.com/search/issues?q=author:${username}+is:pr+is:merged`;
    const res = await fetch(url);
  
    if (!res.ok) {
      console.error("GitHub API Error:", res.statusText);
      return 0;
    }
  
    const data = await res.json();
    const mergedCount = data.total_count || 0;
    const score = mergedCount * 10; // Her merged PR = 10 puan
  
    return score;
  }
  