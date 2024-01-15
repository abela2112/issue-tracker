import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetail = async ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueStatusBadge status={issue?.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose mt-5 max-w-full">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetail;
