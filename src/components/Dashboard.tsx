import { useFetchUsers } from "../hooks/useFetchUsers";
import { Loader } from "./loaderState/Loader";
import { ErrorState } from "./errorState/ErrorState";
import { UserTable } from "./userTable/UserTable";
import { ThemeToggle } from "./themeToggle/ThemeToggle";

export const Dashboard = () => {
  const { users, loading, error } = useFetchUsers();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error?.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', marginTop: '24px' }}>
        <h1 style={{ margin: 0 }}>Users List</h1>
        <ThemeToggle />
      </div>

      <UserTable users={users} />
    </div>
  );
};