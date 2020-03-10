import React from 'react';
import Error from 'next/error';
import Cookies from 'universal-cookie';

import axios from 'axios';
import SignIn from '../views/SignIn';

export default Component => {
  let WithAuth = props => {
    if (props.auth) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.auth.token;
    }

    if (props.status === 200) {
      return <Component {...props} />;
    } else if (props.status === 401) {
      return <SignIn {...props} />;
    } else if (props.status === 403) {
      return <Error statusCode={403} />;
    } else {
      return <Error statusCode={500} />;
    }
  };

  WithAuth.getInitialProps = async context => {
    let props = {};
    let status = 401;
    let cookies;

    // 서버사이드와 프론트사이드는 토큰 유효성 체크 방식이 다름
    if (context.req) {
      // 서버사이드일 경우 리퀘스트의 auth 객체로 넘겨받고 종료
      if (context.req.auth) {
        if (Component.getInitialProps) {
          props = await Component.getInitialProps(context);
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.req.auth.token;
        props.status = 200;
        props.auth = context.req.auth;
        return props;
      } else {
        props.status = 401;
        return props;
      }
    } else {
      // 프론트일 경우 쿠키를 좀 더 탐색한다
      cookies = new Cookies();
    }

    // 쿠키의 토큰 가져온다
    const options = {};
    if (process.env.COOKIE_DOMAIN) {
      options.domain = process.env.COOKIE_DOMAIN;
    }
    const token = cookies.get(process.env.COOKIE_TOKEN_KEY, options);
    // 쿠키가 없다면 무조건 401
    if (token) {
      try {
        // 헤더에 Bearer token 설정
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        // 토큰 유효성 확인 되면 유저정보 불러오기
        // const response = await axios.get( process.env.API_HOST + '/v1/profile');
        props.auth = {
          token,
          user: null,
        };
        status = 200;
      } catch (error) {
        cookies.remove(process.env.COOKIE_TOKEN_KEY);
        status = 401;
      }
    }

    if (status === 200) {
      if (Component.getInitialProps) {
        props = await Component.getInitialProps(context);
      }
      props.status = 200;
    } else {
      props.status = 401;
    }
    return props;
  };

  return WithAuth;
};
