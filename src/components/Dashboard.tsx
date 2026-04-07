import { useFetchUsers } from "../hooks/useFetchUsers";
import { Loader } from "./loaderState/Loader";
import { ErrorState } from "./errorState/ErrorState";
import { UserTable } from "./userTable/UserTable";
import { ThemeToggle } from "./themeToggle/ThemeToggle";
import { SearchInput } from "./searchInput/SearchInput";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { users, loading, error, hasMore, fetchNextPage } = useFetchUsers(debouncedSearch);

  // If we are currently loading and there are no users yet, show the full-page Loader.
  // Otherwise, the virtual list itself will handle the bottom loading row.
  if (loading && users.length === 0) {
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
      
      <div style={{ marginBottom: '24px' }}>
        <SearchInput 
          value={search} 
          onChange={setSearch} 
          placeholder="Filter by name or email..." 
        />
      </div>

      <UserTable 
        users={users} 
        fetchNextPage={fetchNextPage} 
        hasMore={hasMore} 
        isLoading={loading} 
      />
    </div>
  );
};