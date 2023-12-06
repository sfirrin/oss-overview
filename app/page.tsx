import { IssueOrPRCard } from "@/components/issue-or-pr";
import { IssueOrPR, getGitHubIssuesAndPRs } from "@/lib/get-github-data";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { repo: string | string[] | undefined };
}) {
  const { repo: repoParam } = searchParams;
  const repos = repoParam
    ? Array.isArray(repoParam)
      ? repoParam
      : [repoParam]
    : [];

  console.log({ repos });

  if (repos.length === 0) {
    return (
      <main className="mt-3">
        <h2 className="px-2 text-2xl font-bold w-full">No repos entered yet</h2>
        <span className="pt-1 px-2 text-gray-600 dark:text-gray-400 italic font-light">
          Please enter at least one repo in the header, or click{" "}
          <Link
            className="underline"
            href="/?repo=DataDog/serverless-plugin-datadog&repo=DataDog/datadog-cdk-constructs&repo=DataDog/datadog-cloudformation-macro"
          >
            here
          </Link>{" "}
          to see an example
        </span>
      </main>
    );
  }

  const projectData = await getGitHubIssuesAndPRs(repos);

  return (
    <main className="mt-3">
      <IssueTimeGroup timeFrameName="Past day" issues={projectData.pastDay} />
      <IssueTimeGroup timeFrameName="Past week" issues={projectData.pastWeek} />
      <IssueTimeGroup
        timeFrameName="Past month"
        issues={projectData.pastMonth}
      />
      <IssueTimeGroup
        timeFrameName="Past 3 months"
        issues={projectData.pastMonth}
      />
      <IssueTimeGroup
        timeFrameName="Older than 3 months"
        issues={projectData.older}
      />
    </main>
  );
}

function IssueTimeGroup({
  timeFrameName,
  issues,
}: {
  timeFrameName: string;
  issues: IssueOrPR[];
}) {
  return (
    <div className="px-2 pb-4">
      <h2 className="px-2 text-2xl font-bold w-full">{timeFrameName}</h2>
      <div className="flex flex-row justify-start flex-wrap ">
        {issues.map((issueOrPR) => (
          <IssueOrPRCard key={issueOrPR.url} issueOrPR={issueOrPR} />
        ))}
      </div>
      {issues.length === 0 && (
        <span className="pt-1 px-2 text-gray-600 dark:text-gray-400 italic font-light">
          No open issues or PRs found in this time frame
        </span>
      )}
    </div>
  );
}
