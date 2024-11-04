import { FC, useEffect } from 'react';
import { useCreateRequestTokenQuery, useCreateSessionMutation } from '@/api/moviesApi.ts';
import { useDispatch } from 'react-redux';

const AuthPage: FC = () => {
    const dispatch = useDispatch();
    const { data: requestToken, refetch } = useCreateRequestTokenQuery();
    const [createSession, { data: sessionId, isSuccess }] = useCreateSessionMutation();

    useEffect(() => {
        if (isSuccess && sessionId) {
            localStorage.setItem('sessionId' ,sessionId );
            localStorage.setItem('accountId' , '21600826');
        }
    }, [isSuccess, sessionId, dispatch]);

    const authUrl = requestToken
        ? `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/your_redirect_page`
        : null;

    return (
        <div>
            <h2>Authentication Page</h2>
            {authUrl ? (
                <a style={{color: '#a88181'}}  href={authUrl} target="_blank" rel="noopener noreferrer">
                    Authorize on TMDB
                </a>
            ) : (
                <p>Loading...</p>
            )}
]            <button
                onClick={() => {
                    if (requestToken) {
                        createSession(requestToken);
                    } else {
                        refetch();
                    }
                }}
            >
                Complete Authentication
            </button>
            {sessionId && <p>Authenticated! Session ID: {sessionId}</p>}
        </div>
    );
};

export default AuthPage;
