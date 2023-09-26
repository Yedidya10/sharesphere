import type { Meta, StoryObj } from '@storybook/react'

import DescriptionInput from './DescriptionInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DescriptionInput> = {
  title: 'Templates/DescriptionInput',
  component: DescriptionInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof DescriptionInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'DescriptionInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'DescriptionInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'DescriptionInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'DescriptionInput',
  },
}
