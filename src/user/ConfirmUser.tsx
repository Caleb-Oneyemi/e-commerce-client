import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { confirmMerchant } from './api-user';
import Swal from 'sweetalert2';
import Header from '../Header';

export default function ConfirmUser() {
    const history = useHistory();
    const location = useLocation();
    const id = location.pathname.split('confirm/')[1];

    useEffect(() => {
        confirmMerchant(id).then(() => {
            Swal.fire('Success', 'Account Confirmed Successfully')
            setTimeout(() => {
                history.push('/stores/all');
            }, 2000)
        }).catch((err) => {
            Swal.fire('Error', err.message)
        })
    }, [id])

    return (
        <div>
            <Header />
        </div>
    );
}