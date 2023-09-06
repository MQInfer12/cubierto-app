import { styled } from "styled-components";

export const Container = styled.section`
  width: 80%;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  & > div{
    width:50%;
   
    & > img{
        width:35px ;
        height: auto;
        background: #000;
    }
  }
`;
