import type { Meta, StoryObj } from '@storybook/react'

import ItemRequestForm from './ItemRequestForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemRequestForm> = {
  title: 'Templates/ItemRequestForm',
  component: ItemRequestForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemRequestForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemRequestForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemRequestForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemRequestForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemRequestForm',
  },
}
