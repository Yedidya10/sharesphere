import type { Meta, StoryObj } from '@storybook/react'

import SearchBar from './SearchBar'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SearchBar> = {
  title: 'Templates/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SearchBar',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SearchBar',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SearchBar',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SearchBar',
  },
}
