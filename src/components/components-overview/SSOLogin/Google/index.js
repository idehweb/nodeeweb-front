import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { googleSso } from '@/API/auth';

export default function Google({ setLoading, onSuccess }) {
  const handle = (d) => {
    setLoading(true);
    googleSso({ credential: d.credential })
      .then((r) => onSuccess(r))
      .catch((er) => toast.error(er))
      .finally(() => setLoading(false));
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        type="icon"
        auto_select={false}
        onSuccess={handle}
        onError={() => {
          let msg = 'ooh. Something went wrong with google sso!!';
          console.error(msg);
          toast.error(msg);
        }}
      />
    </GoogleOAuthProvider>
  );
}
