import { guest, login, signup } from 'services/auth';
import { useEffect, useState } from 'react';

import AddGroupModal from 'components/modals/AddGroupModal';
import Input from 'components/inputs/Input';
import Modal from 'components/modals/Modal';
import getLocalStorage from 'utils/getLocalStorage';

const MainLayout = ({ children }) => {
  console.log(getLocalStorage('token'));
  const [state, setState] = useState('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getLocalStorage('token') === null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      {isAuthenticated && (
        <Modal
          actionButton={state !== 'idle'}
          actionButtonLabel={
            state === 'login' ? 'Login' : state === 'signup' ? 'SignUp' : ''
          }
          onAction={() => {
            state === 'login'
              ? login({ email, password })
              : signup({
                  name,
                  email,
                  password,
                  confirmPassword,
                });

            window.location.reload();
          }}
          onClose={() => setState('idle')}
          show={true}
          title={
            state === 'idle'
              ? 'Hello!'
              : state === 'login'
              ? 'Login'
              : 'Sign Up'
          }
          size={`w-[400px] ${
            state === 'idle'
              ? 'h-[210px]'
              : state === 'login'
              ? 'h-[320px]'
              : 'h-[450px]'
          }`}>
          {state === 'idle' ? (
            <>
              <button
                className="text-white bg-primary rounded-md w-full p-1"
                onClick={() => setState('login')}>
                I already have an account
              </button>
              <button
                className="bg-borderdash p-1 w-full rounded-md my-2"
                onClick={() => setState('signup')}>
                I don't have an account
              </button>
              <button
                className="bg-borderdash p-1 w-full rounded-md"
                onClick={async () => {
                  await guest();

                  window.location.reload();
                }}>
                Login as Guest
              </button>
            </>
          ) : state === 'login' ? (
            <>
              <button onClick={() => setState('idle')}>Back</button>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : (
            <>
              <button onClick={() => setState('idle')}>Back</button>
              <Input
                label="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </Modal>
      )}
      <div className="h-screen">
        <nav className="flex items-center gap-[10px] py-[18px] px-[20px] border-b border-b-borderdash">
          <h1 class="text-textblack font-bold text-[18px]">Product Roadmap</h1>
          <AddGroupModal />
        </nav>
        <div className="main-layout__content">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
