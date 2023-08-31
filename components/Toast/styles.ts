import styled, { keyframes } from "styled-components";

type ToastType = "success" | "error" | "info";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

export const ToastWrapper = styled.div<{ type: ToastType }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.type === "success"
      ? "#4caf50"
      : props.type === "error"
      ? "#f44336"
      : "#2196f3"};
  color: white;
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-in-out, ${fadeOut} 0.3s ease-in-out 2s;
`;
