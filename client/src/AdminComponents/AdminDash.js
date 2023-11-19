import React, { useContext } from 'react';

import ViewAnnouncements from '../TenantComponets/ViewAnnouncements';
import AdminNav from './AdminNav';

export default function AdminDash() {

    return (
        <div>
            <AdminNav/>
            <ViewAnnouncements/>
        </div>
    );
}
