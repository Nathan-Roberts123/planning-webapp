"use client";
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const DndSortable = ({
  children,
  groups,
}: {
  children: React.ReactNode;
  groups: any;
}) => {
  return (
    <DndContext collisionDetection={closestCenter}>
      <SortableContext items={groups} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default DndSortable;
