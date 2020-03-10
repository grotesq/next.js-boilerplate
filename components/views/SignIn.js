import React from 'react';
import { withContext } from 'context-q';

let SignIn = props => {
  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <input type="text" className="border" />
        </div>
        <div>
          <input type="password" className="border" />
        </div>
        <button>로그인</button>
      </form>
    </>
  );
};

SignIn = withContext(SignIn);

export default SignIn;
