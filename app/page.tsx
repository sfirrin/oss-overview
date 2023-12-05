import { IssueOrPR } from "@/components/issue-or-pr";
import { getGitHubIssuesAndPRs } from "@/lib/get-github-data";

export default async function Home() {
  const projectData = await getGitHubIssuesAndPRs([]);
  console.log({ projectData });
  return (
    <main>
      <div className="flex flex-row justify-start flex-wrap px-2">
        <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR />
        <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR />
      </div>
    </main>
  );
}
