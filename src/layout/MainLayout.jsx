import AddGroupModal from 'components/modals/AddGroupModal';

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <nav className="flex items-center gap-[10px] py-[18px] px-[20px] border-b border-b-borderdash">
        <h1 class="text-textblack font-bold text-[18px]">Product Roadmap</h1>
        <AddGroupModal />
      </nav>
      <div className="main-layout__content">{children}</div>
    </div>
  );
};

export default MainLayout;
