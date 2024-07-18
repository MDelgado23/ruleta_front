'use client';

import React from 'react';
import withAuth from '../hoc/withAuth';
import AdminPanel from '../componentes/AdminPanel/AdminPanel';

const Admin = () => {
  return <AdminPanel />;
};

export default withAuth(Admin, ['admin']);
