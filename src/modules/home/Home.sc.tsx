import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  background-color: #f6f8f8;
  height: 100vh;
  min-width: 760px;
`;

export const Navbar = styled.div`
  height: 50px;
  background-color: #011b33;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

export const QuickLinksContainer = styled.div`
  width: 400px;
  margin: 150px auto;

  h3 {
    color: #023565;
    margin: 0;
    margin-bottom: 5px;
  }
  p {
    color: #58666e;
    font-size: 14px;
    margin: 0;
    margin-bottom: 10px;
  }
`;

export const Panel = styled.div`
  border-radius: 6px;
  border: 1px solid #dee5e7;
  padding: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #fff;

  p:first-of-type {
    color: #023565;
    margin: 0;
    margin-bottom: 5px;
    font-weight: bold;
  }

  p:last-of-type {
    color: #363f44;
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
`;

export const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  top: 35px;
  background-color: #f9f9f9;
  width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;

  div {
    float: none;
    color: #58666e;
    padding: 12px 16px;
    text-decoration: none;
    cursor: pointer;
  }

  div:first-of-type {
    background-color: #edf1f2;

    p:first-of-type { margin: 0; font-weight: bold; margin-bottom: 5px; }
    p:last-of-type { margin: 0; }

  }

  div:hover {
    background-color: #edf1f2;
  }
`;
