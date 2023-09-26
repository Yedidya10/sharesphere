import type { Meta, StoryObj } from '@storybook/react'

import MainCategoryInput from './MainCategoryInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MainCategoryInput> = {
  title: 'Templates/MainCategoryInput',
  component: MainCategoryInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MainCategoryInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MainCategoryInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MainCategoryInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MainCategoryInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MainCategoryInput',
  },
}
