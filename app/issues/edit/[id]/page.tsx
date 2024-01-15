import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";
interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(id) },
  });
  console.log("issue: " + issue);
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
