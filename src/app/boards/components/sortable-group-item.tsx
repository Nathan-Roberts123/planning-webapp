"use client";
import React from "react";
import GroupCard from "./group-card";
import NewCardButton from "./new-card-button";
import { horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext } from "@dnd-kit/sortable";

type SortableGroupItemProps = {
  cards: { id: string; title: string; comment: string }[];
  name: string;
  id: string;
};

const SortableGroupItem = ({ cards, name, id }: SortableGroupItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="w-full">
      <div
        className="w-full"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="mb-3">{name}</div>
        <SortableContext items={cards} strategy={horizontalListSortingStrategy}>
          {cards.map((card) => {
            return (
              <GroupCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.comment}
              />
            );
          })}
        </SortableContext>
      </div>
      <NewCardButton groupId={id} />
    </div>
  );
};

export default SortableGroupItem;
