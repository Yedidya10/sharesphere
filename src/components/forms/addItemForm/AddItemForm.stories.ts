import type { Meta, StoryObj } from '@storybook/react'

import AddItemForm from './AddItemForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AddItemForm> = {
  title: 'Templates/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'AddItemForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'AddItemForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'AddItemForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'AddItemForm',
  },
}
