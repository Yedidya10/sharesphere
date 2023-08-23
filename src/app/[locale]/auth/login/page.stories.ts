import type { Meta, StoryObj } from '@storybook/react';

import Login from './page';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Login>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  // args: {
  //   primary: true,
  //   label: 'Login',
  // },
};
