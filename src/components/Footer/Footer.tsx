import React from 'react';
import { styles} from "./styles"

const FooterComponent: React.FC = () => {
  return (
    <styles.outerContainer >
      <styles.logo src="https://res.cloudinary.com/dldfjvzkn/image/upload/v1738895661/logo_dixtt8.jpg"/>
      <styles.stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
        <styles.text variant="large">Explore Indian Cuisine</styles.text>
        <styles.stack horizontal horizontalAlign="center" tokens={{ childrenGap: 15 }}>
          <styles.link href="" target="_blank" >
            Privacy Policy
          </styles.link>
          <styles.link href="" target="_blank" >
            Terms of Service
          </styles.link>
        </styles.stack>
        <styles.text variant="small">© 2025 Indian Cuisine Project</styles.text>
      </styles.stack>
    </styles.outerContainer>
  );
};

export default FooterComponent;
