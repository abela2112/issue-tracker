import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/Auth/AuthOption";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOption);
  if (!session)
    return NextResponse.json(
      { error: "unAuthorized request" },
      { status: 401 }
    );
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  const { title, description } = body;
  // ... save to database
  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
