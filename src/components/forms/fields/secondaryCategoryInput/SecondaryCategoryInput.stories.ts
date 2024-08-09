import type { Meta, StoryObj } from '@storybook/react'

import SecondaryCategoryInput from './SecondaryCategoryInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SecondaryCategoryInput> = {
  title: 'Templates/SecondaryCategoryInput',
  component: SecondaryCategoryInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SecondaryCategoryInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SecondaryCategoryInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SecondaryCategoryInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SecondaryCategoryInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SecondaryCategoryInput',
  },
}
