"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeUser = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const AssignUser = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        AssignUserId: userId === "UnAssigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Change could not be made!");
    }
  };
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.AssignUserId || "UnAssigned"}
        onValueChange={AssignUser}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="UnAssigned">UnAssigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default AssigneeUser;
