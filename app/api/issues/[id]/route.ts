import { AuthOption } from "@/app/Auth/AuthOption";
import { patchIssueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(AuthOption);
  // if (!session)
  //   return NextResponse.json(
  //     { error: "unAuthorized request" },
  //     { status: 401 }
  //   );
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      {
        status: 400,
      }
    );
  }
  const { AssignUserId, title, description } = body;
  if (AssignUserId) {
    const user = await prisma?.user.findUnique({
      where: {
        id: AssignUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user Id" }, { status: 400 });
  }
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma?.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      AssignUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  if (!session)
    return NextResponse.json(
      { error: "unAuthorized request" },
      { status: 401 }
    );
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const deletedIssue = await prisma?.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(deletedIssue, { status: 200 });
}
