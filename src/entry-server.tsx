import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { casesData } from './config/cases';

export { casesData };

export function render(url: string = '/') {
  return renderToString(
    <React.StrictMode>
      <App initialRoute={url} />
    </React.StrictMode>
  );
}
