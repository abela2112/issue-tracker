import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link
        href={`/issues/edit/${issueId}`}
        className="flex gap-x-2 items-center"
      >
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditButton;
