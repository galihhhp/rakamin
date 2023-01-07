import AddGroupModal from 'components/modals/AddGroupModal';

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <nav className="flex items-center gap-2 h-20 pl-10 border-b border-b-black">
        <h1>Product Roadmap</h1>
        <AddGroupModal />
      </nav>
      <div className="main-layout__content">{children}</div>
    </div>
  );
};

export default MainLayout;
