import React from 'react';
import { Stack, Text, Link } from '@fluentui/react';

const footerStyles = {
  root: {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
  },
};

const FooterComponent: React.FC = () => {
  return (
    <div style={footerStyles.root}>
      <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
        <Text variant="large">Explore Indian Cuisine</Text>
        <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 15 }}>
          <Link href="https://www.example.com/privacy" target="_blank" styles={{ root: { color: 'white' } }}>
            Privacy Policy
          </Link>
          <Link href="https://www.example.com/terms" target="_blank" styles={{ root: { color: 'white' } }}>
            Terms of Service
          </Link>
        </Stack>
        <Text variant="small">© 2025 Indian Cuisine Project</Text>
      </Stack>
    </div>
  );
};

export default FooterComponent;
