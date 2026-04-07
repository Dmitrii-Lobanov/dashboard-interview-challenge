import { useRef, useEffect } from 'react';
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

export const UserTable = ({ users, fetchNextPage, hasMore, isLoading }: UserTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? users.length + 1 : users.length,
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
      lastItem.index >= users.length - 1 &&
      hasMore &&
      !isLoading &&
      fetchNextPage
    ) {
      fetchNextPage();
    }
  }, [hasMore, fetchNextPage, users.length, isLoading, virtualItems]);

  if (!users || users.length === 0) {
    if (isLoading) return null; // Let dashboard loader handle full-page empty state
    return <div className="no-users">No users found</div>;
  }

  return (
    <div 
      className="table-wrapper animate-fade-in" 
      ref={parentRef} 
      style={{ height: '80vh', overflow: 'auto' }}
    >
      <div className="user-table">
        <div className="table-header">
          <div className="th col-name">Name</div>
          <div className="th col-email">Email</div>
          <div className="th col-company">Company</div>
        </div>
        
        <div 
          className="table-body" 
          style={{ 
            height: `${rowVirtualizer.getTotalSize()}px`, 
            position: 'relative' 
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > users.length - 1;
            const user = users[virtualRow.index];

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
};
