import { authOptions } from "@/lib/authOptions";
import NewGroupButton from "./components/new-group-button";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { type Group as TGroup } from "@prisma/client";
import DndSortable from "./components/dnd-sortable";
import Group from "./components/group";

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
      <DndSortable groups={groups}>
        {groups.map((group) => {
          return <Group key={group.id} id={group.id} name={group.name} />;
        })}
      </DndSortable>

      {workspace && (
        <div className="w-[317px]">
          <div className="mb-3">Add New Group</div>
          <NewGroupButton />
        </div>
      )}
    </div>
  );
};

export default Boards;
