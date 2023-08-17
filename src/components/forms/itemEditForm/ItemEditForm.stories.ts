import type { Meta, StoryObj } from '@storybook/react'

import ItemEditForm from './ItemEditForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ItemEditForm> = {
  title: 'Templates/ItemEditForm',
  component: ItemEditForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemEditForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ItemEditForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ItemEditForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ItemEditForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ItemEditForm',
  },
}
