import Cookies from 'js-cookie';

const inMemory = () => {
    const getToken = () => {
        return Cookies.get('token');
    };

    const setToken = (token) => {
        Cookies.set('token', token);
    };

    const getProfile = () => {
        if (Cookies.get('profile')) {
            return JSON.parse(Cookies.get('profile'));
        }
        return null;
    };

    const setProfile = (profile) => {
        Cookies.set('profile', JSON.stringify(profile));
    };

    const removeSession = () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('profile', { path: '/' });
    };

    return {
        getToken,
        setToken,
        getProfile,
        setProfile,
        removeSession
    };
};

export default inMemory();
