import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open", value: open, status: Status.OPEN },
    { label: "Closed", value: closed, status: Status.CLOSED },
    { label: "InProgress", value: inProgress, status: Status.IN_PROGRESS },
  ];

  return (
    <Flex gap={"4"}>
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label} Issues
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
