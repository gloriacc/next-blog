import React from "react";
import Link from "next/link";
import styled from "styled-components";


const Wrapper = styled.div`
  color: white;
`;
export default function FirstPost() {

  return (
    <Wrapper>First Post
      <Link href="/"><a>Index</a></Link>
    </Wrapper>
  )
}