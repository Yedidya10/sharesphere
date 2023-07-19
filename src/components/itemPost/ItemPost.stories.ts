import type { Meta, StoryObj } from '@storybook/react'

import ItemPost from './ItemPost'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemPost> = {
  title: 'Templates/ItemPost',
  component: ItemPost,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemPost>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemPost',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemPost',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemPost',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemPost',
  },
}
