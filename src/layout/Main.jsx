const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <h1>Layout</h1>
      <div className="main-layout__content">{children}</div>
    </div>
  );
};

export default MainLayout;
