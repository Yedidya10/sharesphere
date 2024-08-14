import type { Meta, StoryObj } from '@storybook/react'

import DeleteAccountRequest from './DeleteAccountRequest'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DeleteAccountRequest> = {
  title: 's/DeleteAccountRequest',
  component: DeleteAccountRequest,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof DeleteAccountRequest>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'DeleteAccountRequest',
  },
}

export const Secondary: Story = {
  args: {
    label: 'DeleteAccountRequest',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'DeleteAccountRequest',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'DeleteAccountRequest',
  },
}
