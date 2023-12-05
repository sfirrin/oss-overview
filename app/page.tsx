import { IssueOrPR } from "@/components/issue-or-pr";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-start flex-wrap px-2">
        <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR />
        <IssueOrPR /> <IssueOrPR /> <IssueOrPR /> <IssueOrPR />
      </div>
    </main>
  );
}
