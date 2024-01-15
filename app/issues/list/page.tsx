import prisma from "@/prisma/client";
import Pagination from "@/app/components/Pagination";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTables, { columnNames } from "./IssueTables";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma?.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTables searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};
export const metadata: Metadata = {
  title: "Issues Tracker - Issue List",
  description: "View all Issues in your project.",
};
export default IssuesPage;
