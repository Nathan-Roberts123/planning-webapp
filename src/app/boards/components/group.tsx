import React from "react";
import prisma from "@/lib/db";
import SortableGroupItem from "./sortable-group-item";

type GroupProps = {
  id: string;
  name: string;
};

const Group = async ({ id, name }: GroupProps) => {
  const cards = await prisma.groupCard.findMany({
    where: {
      groupId: id,
    },
  });
  return <SortableGroupItem cards={cards} id={id} name={name} />;
};

export default Group;
