import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* 在 React Router v6 及之后的版本中，<Outlet /> 是一个新引入的组件。
      它是用于渲染子路由组件的位置标记。换句话说，当您有嵌套路由时，<Outlet /> 指定了父路由组件中应该渲染子路由组件的位置。 */}
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWide Inc
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
