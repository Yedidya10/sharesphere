import type { Meta, StoryObj } from '@storybook/react'

import Logo from './Logo'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Logo> = {
  title: 'Templates/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Logo',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Logo',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Logo',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Logo',
  },
}
