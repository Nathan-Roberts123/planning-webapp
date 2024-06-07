"use client";
import React from "react";
import EditCardButton from "./edit-card-button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type GroupCardProps = {
  id: string;
  title: string;
  description: string;
};

const GroupCard = ({ id, title, description }: GroupCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      <div className="w-full bg-white shadow rounded p-2">
        <div className="flex justify-between p-2">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-md">{title}</h2>
            <div className="text-sm">{description}</div>
          </div>
          <EditCardButton />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
