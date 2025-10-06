import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import './UserList.css';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (page = 0) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users?page=${page}&size=8`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchUsers(currentPage);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
    fetchUsers(currentPage);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <div>
          <h2>Users ({users.length})</h2>
          <p>Manage your users and their permissions</p>
        </div>
        <button onClick={() => setShowForm(true)} className="add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          Add User
        </button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="user-name">{user.username}</div>
                      <div className="user-id">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d={user.role === 'ADMIN' ? "M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1M12,7C10.9,7 10,7.9 10,9C10,10.1 10.9,11 12,11C13.1,11 14,10.1 14,9C14,7.9 13.1,7 12,7M18,15C18,12.97 15.84,10.8 13.5,10.8C13.16,10.8 12.84,10.84 12.5,10.9C12.16,10.84 11.84,10.8 11.5,10.8C9.16,10.8 7,12.97 7,15V16H18V15Z" : "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"} />
                    </svg>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(user)} className="edit-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="delete-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <div className="pagination-info">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`pagination-number ${currentPage === i ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage >= totalPages - 1}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
        <UserForm
          user={editingUser}
          token={token}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default UserList;