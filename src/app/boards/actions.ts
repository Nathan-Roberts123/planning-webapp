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
    const workspace = await prisma.workspace.update({
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
