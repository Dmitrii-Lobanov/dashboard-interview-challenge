import { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import './UserTable.css';

export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface UserTableProps {
  users: User[];
  fetchNextPage?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const UserTable = memo(({ users, fetchNextPage, hasMore, isLoading }: UserTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [sortKey, setSortKey] = useState<keyof User | 'company' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback((key: keyof User | 'company') => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }, [sortKey]);

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    if (!sortKey) return users;
    return [...users].sort((a, b) => {
      const valA = sortKey === 'company' ? a.company.name : a[sortKey as keyof User];
      const valB = sortKey === 'company' ? b.company.name : b[sortKey as keyof User];
      
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortKey, sortDirection]);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? sortedUsers.length + 1 : sortedUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // row height
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= sortedUsers.length - 1 &&
      hasMore &&
      !isLoading &&
      fetchNextPage
    ) {
      fetchNextPage();
    }
  }, [hasMore, fetchNextPage, sortedUsers.length, isLoading, virtualItems]);

  const renderSortIndicator = useCallback((key: string) => {
    if (sortKey !== key) return <span className="sort-icon inactive">↕</span>;
    return sortDirection === 'asc' ? <span className="sort-icon active">↑</span> : <span className="sort-icon active">↓</span>;
  }, [sortKey, sortDirection]);

  if (!users || users.length === 0) {
    if (isLoading) return null; // Let dashboard loader handle full-page empty state
    return <div className="no-users">No users found</div>;
  }

  return (
    <div 
      className="table-wrapper animate-fade-in" 
      ref={parentRef} 
      style={{ height: '75vh', overflow: 'auto' }}
    >
      <div className="user-table">
        <div className="table-header">
          <div className="th col-name sortable" onClick={() => handleSort('name')}>
            <span>Name</span> {renderSortIndicator('name')}
          </div>
          <div className="th col-email sortable" onClick={() => handleSort('email')}>
            <span>Email</span> {renderSortIndicator('email')}
          </div>
          <div className="th col-company sortable" onClick={() => handleSort('company')}>
            <span>Company</span> {renderSortIndicator('company')}
          </div>
        </div>
        
        <div 
          className="table-body" 
          style={{ 
            height: `${rowVirtualizer.getTotalSize()}px`, 
            position: 'relative' 
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > sortedUsers.length - 1;
            const user = sortedUsers[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                className="table-row"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <>
                    <div className="td col-name">
                      <div className="skeleton-box skeleton-name"></div>
                    </div>
                    <div className="td col-email">
                      <div className="skeleton-box skeleton-email"></div>
                    </div>
                    <div className="td col-company">
                      <div className="skeleton-box skeleton-company"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="td col-name">
                      <div className="user-name">{user.name}</div>
                    </div>
                    <div className="td col-email">
                      <div className="user-email">{user.email}</div>
                    </div>
                    <div className="td col-company">
                      <div className="user-company">{user.company.name}</div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
