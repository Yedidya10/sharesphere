import type { Meta, StoryObj } from '@storybook/react';

import Register from './page';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Register> = {
  title: 'Pages/Register',
  component: Register,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof Register>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  // args: {
  //   primary: true,
  //   label: 'Register',
  // },
};

