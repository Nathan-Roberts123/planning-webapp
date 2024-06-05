import prisma from "@/lib/db";
import Navbar from "./navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { TBoard } from "@/lib/types";
import { TWorkspace } from "@/lib/types";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  let boards: TBoard[] = [];
  let workspace: TWorkspace | null = null;

  if (session) {
    boards = await prisma.board.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    workspace = await prisma.workspace.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        board: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  return (
    <div className="p-2">
      <Navbar boards={boards} workspace={workspace} />
      {children}
    </div>
  );
};

export default MainLayout;
