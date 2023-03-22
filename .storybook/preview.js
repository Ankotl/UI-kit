// Apply global styles to storybook
import '../src/styles/index.scss'
import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)