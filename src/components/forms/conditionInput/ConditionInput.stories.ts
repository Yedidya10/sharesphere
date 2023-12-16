import type { Meta, StoryObj } from '@storybook/react'

import ConditionInput from './ConditionInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ConditionInput> = {
  title: 'Templates/ConditionInput',
  component: ConditionInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ConditionInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ConditionInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ConditionInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ConditionInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ConditionInput',
  },
}
