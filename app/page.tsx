import { Flex, Grid } from "@radix-ui/themes";
import IssueCharts from "./IssueCharts";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma?.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closed = await prisma?.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgress = await prisma?.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueCharts open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
export const metadata: Metadata = {
  title: "Issues Tracker - Dashboard",
  description: "View a summary of the issues in your project.",
};
