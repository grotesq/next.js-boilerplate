import React from 'react';
import { Link } from '../next-routes';

export default () => (
  <>
    <ul>
      <li>
        <Link route={'/'}>
          <a href={'/'}>Index</a>
        </Link>
      </li>
      <li>
        <Link route={'/sign-in'}>
          <a href={'/sign-in'}>Sign In</a>
        </Link>
      </li>
      <li>
        <Link route={'/auth'}>
          <a href={'/auth'}>Auth</a>
        </Link>
      </li>
    </ul>
  </>
);
