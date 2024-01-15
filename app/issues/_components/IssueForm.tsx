"use client";
import { ErrorMessage } from "@/app/components";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { IssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Callout, TextField, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Issue } from "@prisma/client";

type IssueForm = z.infer<typeof IssueSchema>;
interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (issue) {
              await axios.patch("/api/issues/" + issue.id, data);
            } else {
              await axios.post("/api/issues", data);
            }
            router.push("/issues/list");
            router.refresh();
          } catch (error) {
            setError("An unExpected Error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="title"
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>{issue ? "Update an Issue" : "Submit an Issue"}</Button>
      </form>
    </div>
  );
};

export default IssueForm;
