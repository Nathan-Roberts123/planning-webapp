import { authOptions } from "@/lib/authOptions";
import NewGroupButton from "./components/new-group-button";
import Group from "./components/group";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { type Group as TGroup } from "@prisma/client";

const Boards = async () => {
  let groups: TGroup[] = [];

  const session = await getServerSession(authOptions);
  const workspace = await prisma.workspace.findUnique({
    where: {
      userId: session?.user.id,
    },
  });

  if (workspace) {
    groups = await prisma.group.findMany({
      where: {
        boardId: workspace?.boardId,
      },
    });
  }

  return (
    <div className="flex flex-row gap-4 p-2 mt-4 overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-500 scrollbar-track-slate-300 scrollbar-thin h-full text-nowrap">
      {groups.map((group) => {
        return (
          <div key={group.id} className="w-[317px]">
            <Group id={group.id} name={group.name} />
          </div>
        );
      })}

      <div className="w-[317px]">
        <div className="mb-3">Add New Group</div>
        <NewGroupButton />
      </div>
    </div>
  );
};

export default Boards;
