import type { Meta, StoryObj } from '@storybook/react'

import ImageUrlInput from './ImageUrlInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ImageUrlInput> = {
  title: 'Templates/ImageUrlInput',
  component: ImageUrlInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ImageUrlInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ImageUrlInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ImageUrlInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ImageUrlInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ImageUrlInput',
  },
}
