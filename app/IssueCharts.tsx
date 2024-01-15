"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const IssueCharts = ({
  open,
  closed,
  inProgress,
}: {
  open: number;
  closed: number;
  inProgress: number;
}) => {
  const data: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In Progress", value: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ fill: "#6e56ef" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
