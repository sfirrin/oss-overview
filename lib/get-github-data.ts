import { octokit } from "./octokit";

export interface IssueOrPR {
  title: string;
  url: string;
  type: "issue" | "pr";
  createdBy: string;
  createdAt: number;
  commentCount: number;
  // lastCommentAt: number;
  // lastCommentBy: string;
  repoName: string;
  repoOwner: string;
  isInternal: boolean;
}

export async function getGitHubIssuesAndPRs(projectNames: string[]) {
  const requests = [];

  for (let projectName of projectNames) {
    const [owner, repo] = projectName.split("/");

    const issues = octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
      state: "open",
    });

    requests.push(issues);
  }
  console.log("Making " + requests.length + " requests to GitHub API");

  const responses = await Promise.all(requests);

  const issuesAndPrs: IssueOrPR[] = [];

  console.log("Received " + responses.length + " responses from GitHub API")

  for (let response of responses) {
    const queryUrl = response.url;
    const splitQueryUrl = queryUrl.split("/");

    const repoName = splitQueryUrl[splitQueryUrl.length - 2];
    const repoOwner = splitQueryUrl[splitQueryUrl.length - 3];

    for (let issueOrPR of response.data) {
      const issueOrPRData: IssueOrPR = {
        title: issueOrPR.title,
        url: issueOrPR.html_url,
        type: (issueOrPR as any).pull_request ? "pr" : "issue",
        createdBy: issueOrPR.user?.login ?? "unknown",
        createdAt: Date.parse(issueOrPR.created_at),
        commentCount: (issueOrPR as any).comments,
        isInternal: issueOrPR.author_association !== "NONE",
        // lastCommentAt: Date.parse(issueOrPR.updated_at),
        // lastCommentBy: "lastCommentBy",
        repoName,
        repoOwner,
      };
      issuesAndPrs.push(issueOrPRData);
    }
  }
  issuesAndPrs.sort((a, b) => b.createdAt - a.createdAt);

  console.log("Found "  + issuesAndPrs.length + " issues and PRs")

  console.error("This is a error message")
  console.warn("This is a warning message")
  console.info("This is a info message")
  console.log("This is a log message")
  console.debug("This is a debug message")

  const groupedByTimeFrame = groupIssuesAndPrsByTimeFrame(issuesAndPrs);
  return groupedByTimeFrame;
}

const groupIssuesAndPrsByTimeFrame = (issuesAndPrs: IssueOrPR[]) => {
  const timeGroups = {
    pastDay: [] as IssueOrPR[],
    pastWeek: [] as IssueOrPR[],
    pastMonth: [] as IssueOrPR[],
    pastThreeMonths: [] as IssueOrPR[],
    older: [] as IssueOrPR[],
  };
  for (let issueOrPr of issuesAndPrs) {
    const age = Date.now() - issueOrPr.createdAt;
    if (age < 1000 * 60 * 60 * 24) {
      timeGroups.pastDay.push(issueOrPr);
    } else if (age < 1000 * 60 * 60 * 24 * 7) {
      timeGroups.pastWeek.push(issueOrPr);
    } else if (age < 1000 * 60 * 60 * 24 * 30) {
      timeGroups.pastMonth.push(issueOrPr);
    } else if (age < 1000 * 60 * 60 * 24 * 90) {
      timeGroups.pastThreeMonths.push(issueOrPr);
    } else {
      timeGroups.older.push(issueOrPr);
    }
  }
  return timeGroups;
};
