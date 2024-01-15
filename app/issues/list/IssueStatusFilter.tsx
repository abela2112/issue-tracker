"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
const statuses: { label: string; status?: Status }[] = [
  { label: "All" },
  { label: "Open", status: Status.OPEN },
  { label: "Closed", status: Status.CLOSED },
  { label: "In Progress", status: Status.IN_PROGRESS },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status")!}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) {
          params.append("status", status === "all" ? "" : status);
        }
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter By Status..." />
      <Select.Content>
        {statuses.map((status, i) => (
          <Select.Item key={i} value={status.status || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
