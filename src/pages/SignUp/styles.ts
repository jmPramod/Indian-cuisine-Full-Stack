import styled from "@emotion/styled";

export const styles={
  outerContainer: styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  min-height: calc(90vh - 70px);
  padding: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  
    flex-direction: column-reverse;
  }
`,
leftContainer: styled("div")`
  width: 50%;
  @media (max-width: 768px) {

    width: 100%;
}
`,
pTag:styled("p")`

color: red;
 font-size: 12px
`,
image: styled("img")`
  width: 80%;
`,
rightContainer: styled("div")`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {

width: 100%;
}
`,
loginForm: styled("form")`
  display: flex;
  background: #efefef;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  width: 80%;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /* background: white; */
  @media (max-width: 768px) {

width: 100%;
}
`,
heading: styled("h2")`
  text-align: center;
  margin-bottom: 10px;
`,
input: styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`,
button: styled("button")`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`,
}