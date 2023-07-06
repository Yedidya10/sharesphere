import type { Meta, StoryObj } from '@storybook/react';

import BaseTemplate from './BaseTemplate';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseTemplate> = {
  title: 'Templates/BaseTemplate',
  component: BaseTemplate,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseTemplate>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'BaseTemplate',
  },
};

export const Secondary: Story = {
  args: {
    label: 'BaseTemplate',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'BaseTemplate',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'BaseTemplate',
  },
};
