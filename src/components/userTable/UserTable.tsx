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
}

export const UserTable = ({ users }: UserTableProps) => {
  if (!users || users.length === 0) {
    return <div className="no-users">No users found</div>;
  }

  return (
    <div className="table-wrapper animate-fade-in">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-name">{user.name}</div>
              </td>
              <td>
                <div className="user-email">{user.email}</div>
              </td>
              <td>
                <div className="user-company">{user.company.name}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
