import type { Meta, StoryObj } from '@storybook/react'

import SortForm from './SortForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SortForm> = {
  title: 'Templates/SortForm',
  component: SortForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SortForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SortForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SortForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SortForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SortForm',
  },
}
