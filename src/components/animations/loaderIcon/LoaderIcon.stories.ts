import type { Meta, StoryObj } from '@storybook/react'

import LoaderIcon from './LoaderIcon'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LoaderIcon> = {
  title: 'Templates/LoaderIcon',
  component: LoaderIcon,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof LoaderIcon>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'LoaderIcon',
  },
}

export const Secondary: Story = {
  args: {
    label: 'LoaderIcon',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'LoaderIcon',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'LoaderIcon',
  },
}
