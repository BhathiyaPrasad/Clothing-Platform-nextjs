import AdminLayout from '../layout/AdminLayout';
// import AuthGuard from '../../components/AuthGuard';
import Dashboard from './Dashboard';

const AdminDashboard = () => {
  return (
    // <AuthGuard>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    // </AuthGuard>
  );
};

export default AdminDashboard;
