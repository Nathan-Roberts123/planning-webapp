"use client";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { signOut } from "next-auth/react";
import { useRef } from "react";
import { createBoard, updateWorkspace } from "../actions";
import { useFormState } from "react-dom";
import { TBoard, TWorkspace } from "@/lib/types";

const Navbar = ({
  boards,
  workspace,
}: {
  boards: TBoard[];
  workspace: TWorkspace | null;
}) => {
  const [visible, setVisible] = useState(false);
  const [state, formAction] = useFormState(createBoard, { status: "" });
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (state.status === "success") {
      setVisible(false);
    }
  }, [state]);

  const renderBoards = boards.map((board) => {
    return {
      label: board.name,
      command: async () => {
        updateWorkspace(board.id);
      },
    };
  });

  const items = [
    {
      label: "Boards",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            setVisible(true);
          },
        },
        {
          separator: true,
        },
        ...renderBoards,
      ],
    },
  ];

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => handleHide()}
          className="p-button-text"
        />
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }}
          autoFocus
          type="submit"
        />
      </div>
    );
  };

  return (
    <>
      <Dialog
        className="w-48"
        visible={visible}
        onHide={handleHide}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        header="Create A New Board"
        footer={renderFooter()}
        draggable={false}
      >
        <h5 className="font-bold mb-2">Board Name</h5>
        <form ref={formRef} action={formAction}>
          <InputText className="w-full" name="board_name" />
        </form>
      </Dialog>

      <Menubar
        model={items}
        start={
          <p className="mr-3">
            {workspace ? workspace.board.name : boards[0] ? boards[0].name : ""}
          </p>
        }
        end={
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          />
        }
      />
    </>
  );
};

export default Navbar;
