import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/Auth/AuthOption";
import AssigneeUser from "./AssigneeUser";
import { cache } from "react";
interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) =>
  prisma?.issue.findUnique({
    where: { id: issueId },
  })
);
const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(AuthOption);
  const issue = await fetchUser(parseInt(id));
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction={"column"} gap={"2"}>
            <AssigneeUser issue={issue} />
            <EditButton issueId={issue.id} />
            <DeleteButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of Issue-" + issue?.id,
  };
};
export const dynamic = "force-dynamic";
export default IssueDetailsPage;
