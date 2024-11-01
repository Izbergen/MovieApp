import { FC, useEffect } from 'react';
import { useCreateRequestTokenQuery, useCreateSessionMutation } from '@/api/moviesApi.ts';
import { useDispatch } from 'react-redux';
import { setSessionId } from '@/features/sessionSlice';

const AuthPage: FC = () => {
    const dispatch = useDispatch();
    const { data: requestToken, refetch } = useCreateRequestTokenQuery();
    const [createSession, { data: sessionId, isSuccess }] = useCreateSessionMutation();

    // Когда sessionId создан, сохраняем его в Redux
    useEffect(() => {
        if (isSuccess && sessionId) {
            dispatch(setSessionId(sessionId));
        }
    }, [isSuccess, sessionId, dispatch]);

    // Ссылка для подтверждения токена
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
