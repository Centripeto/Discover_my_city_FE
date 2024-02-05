import { useAuth } from '../../providers/AuthProvider';
import { ROLE } from '../constants';
import PageNotAuth from './page-not-auth.component';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();
    const enabledRoles = roles?.length ? roles : Object.keys(ROLE).map(key => ROLE[key]);
    if(!user || !enabledRoles.includes(user.role)) {
        return <PageNotAuth />
    }
    return children; 
}

export default ProtectedRoute;