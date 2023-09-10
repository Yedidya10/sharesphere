import type { Meta, StoryObj } from '@storybook/react'

import MagicLinkForm from './MagicLinkForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MagicLinkForm> = {
  title: 'Components/Auth/MagicLinkForm',
  component: MagicLinkForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof MagicLinkForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'MagicLinkForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'MagicLinkForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'MagicLinkForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'MagicLinkForm',
  },
}
