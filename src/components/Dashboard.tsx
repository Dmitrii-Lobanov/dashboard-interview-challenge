import { useFetchUsers } from "../hooks/useFetchUsers";
import { Loader } from "./loaderState/Loader";
import { ErrorState } from "./errorState/ErrorState";
import { UserTable } from "./userTable/UserTable";

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
      <h1>Users List</h1>

      <UserTable users={users} />
    </div>
  );
};