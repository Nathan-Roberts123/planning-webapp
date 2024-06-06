import React from "react";
import GroupCard from "./group-card";
import NewCardButton from "./new-card-button";
import prisma from "@/lib/db";

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
  return (
    <div className="w-full">
      <div className="mb-3">{name}</div>
      {cards.map((card) => {
        return (
          <div key={card.id} className="mb-4">
            <GroupCard title={card.title} description={card.comment} />
          </div>
        );
      })}
      <NewCardButton groupId={id} />
    </div>
  );
};

export default Group;
