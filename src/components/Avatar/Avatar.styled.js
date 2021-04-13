import styled from "styled-components";

export const AvatarImg = styled.img`
    width: ${({ size }) => size === "sm" ? "30px" : size === "md" ? "40px" : "50px"};
    border-radius: 50%;
`;