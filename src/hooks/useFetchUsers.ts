import { useState, useEffect, useRef, useCallback } from "react";
import { getUsers } from "../services/api/users";
import type { User } from "../components/userTable/UserTable";

export const useFetchUsers = (searchQuery: string = "") => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchNextPage = useCallback(async (isReset = false) => {
    if (isFetchingRef.current || (!hasMore && !isReset)) return;
    
    isFetchingRef.current = true;
    setLoading(true);
    
    try {
      const nextPage = isReset ? 1 : pageRef.current + 1;
      const response = await getUsers(nextPage, 10, searchQuery);
      
      setUsers((prev) => isReset ? response.data : [...prev, ...response.data]);
      
      const loadedCount = isReset ? response.data.length : users.length + response.data.length;
      setHasMore(loadedCount < response.totalCount);
      pageRef.current = nextPage;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, searchQuery, users.length]);

  useEffect(() => {
    pageRef.current = 0;
    setHasMore(true);
    fetchNextPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return { users, loading, error, hasMore, fetchNextPage };
};
