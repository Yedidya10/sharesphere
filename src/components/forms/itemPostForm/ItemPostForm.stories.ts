import type { Meta, StoryObj } from '@storybook/react'

import ItemPostForm from './ItemPostForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemPostForm> = {
  title: 'Templates/ItemPostForm',
  component: ItemPostForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemPostForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemPostForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemPostForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemPostForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemPostForm',
  },
}
