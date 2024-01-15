import React from "react";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
const LatestIssues = async () => {
  const issues = await prisma?.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: { AssignUser: true },
  });
  return (
    <Card>
      <Heading size={"3"} mb={"5"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    {issue.title}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.AssignUser && (
                    <Avatar
                      src={issue.AssignUser.image!}
                      fallback="?"
                      size={"2"}
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
