"use client";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const handleHide = () => {
    setVisible(false);
  };

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
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
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
          onClick={() => handleHide()}
          autoFocus
          type="submit"
        />
      </div>
    );
  };

  return (
    <div className="p-2">
      <form>
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
          <InputText className="w-full" />
        </Dialog>
      </form>

      <Menubar
        model={items}
        start={<p className="mr-3">Current Board</p>}
        end={<Button label="Logout" icon="pi pi-sign-out" />}
      />
      {children}
    </div>
  );
};

export default MainLayout;
