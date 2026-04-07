import { useState, useEffect, useRef } from "react";
import { getUsers } from "../services/api/users";
import type { User } from "../components/userTable/UserTable";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchNextPage = async () => {
    if (isFetchingRef.current || !hasMore) return;
    
    isFetchingRef.current = true;
    setLoading(true);
    
    try {
      const nextPage = pageRef.current + 1;
      const response = await getUsers(nextPage, 10);
      
      setUsers((prev) => [...prev, ...response.data]);
      setHasMore(users.length + response.data.length < response.totalCount);
      pageRef.current = nextPage;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchNextPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return { users, loading, error, hasMore, fetchNextPage };
};
