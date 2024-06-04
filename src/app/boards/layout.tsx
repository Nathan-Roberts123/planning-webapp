import MainLayout from "./components/main-layout";

const BoardsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default BoardsLayout;
