/*
  스페이서 Spacer

  작성자: Naram Kim a.k.a. Unknown
  이메일: unknown@grotesq.com

  요소와 요소 사이의 간격을 설정할 때 사용할 수 있는 유틸리티.
  모든 요소의 마진을 0으로 설정한 후 스페이서를 사용하는 방법도 있지만 이 프로젝트에서는 그렇게 하지는 않는다.
  다만 마진을 설정하기 위해 스타일드 컴포넌트를 하나 추가로 생성하는 것 보다 스페이서를 이용해 크기를 지정하는 것이 빠르고 편리하다.
  `width`와 `height`라는 props를 가지며 현재는 px 단위로만 입력받는다.
 */

import styled from 'styled-components';

export default styled.div`
  width: ${props => (props.width ? parseInt(props.width, 10) : 0)}px;
  height: ${props => (props.height ? parseInt(props.height, 10) : 0)}px;
`;
