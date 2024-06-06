"use server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

type TState = {
  status: string;
};

export const createBoard = async (prevState: TState, data: FormData) => {
  const session = await getServerSession(authOptions);
  const board_name = data.get("board_name") as string;

  if (board_name && session) {
    const board = await prisma.board.create({
      data: { name: board_name, userId: session.user.id },
    });

    await prisma.workspace.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        boardId: board.id,
      },
      update: {
        boardId: board.id,
      },
    });

    revalidatePath("/boards");
    return { status: "success" };
  }

  return { status: "failed" };
};

export const updateWorkspace = async (boardId: string) => {
  const session = await getServerSession(authOptions);

  if (session) {
    await prisma.workspace.update({
      where: {
        userId: session.user.id,
      },
      data: {
        boardId: boardId,
      },
    });

    revalidatePath("/boards");
  }
};

export const createGroup = async (prevState: TState, data: FormData) => {
  const name = data.get("group_name") as string;
  const session = await getServerSession(authOptions);

  if (!name.length) {
    return { status: "failed" };
  }

  if (session) {
    const workspace = await prisma.workspace.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (workspace) {
      await prisma.group.create({
        data: {
          name,
          boardId: workspace.boardId,
        },
      });
    }
    revalidatePath("/boards");

    return { status: "success" };
  }

  return { status: "failed" };
};

type TCreateCardState = {
  status: string;
  groupId?: string;
};

export const createCard = async (
  prevState: TCreateCardState,
  data: FormData
) => {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const groupId = prevState.groupId;

  if (!title.length || !groupId) {
    return { status: "failed" };
  }

  await prisma.groupCard.create({
    data: {
      title,
      comment: description,
      groupId,
    },
  });

  revalidatePath("/boards");
  return { status: "success", groupId: "" };
};
