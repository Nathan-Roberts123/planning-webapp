"use client";
import React from "react";
import EditCardButton from "./edit-card-button";

type GroupCardProps = {
  title: string;
  description: string;
};

const GroupCard = ({ title, description }: GroupCardProps) => {
  return (
    <div className="w-full bg-white shadow rounded p-2">
      <div className="flex justify-between p-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-md">{title}</h2>
          <div className="text-sm">{description}</div>
        </div>
        <EditCardButton />
      </div>
    </div>
  );
};

export default GroupCard;
