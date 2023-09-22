import type { Meta, StoryObj } from '@storybook/react'

import ImageInput from './ImageInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ImageInput> = {
  title: 'Templates/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ImageInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ImageInput',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ImageInput',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ImageInput',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ImageInput',
  },
}
