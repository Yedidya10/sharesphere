import type { Meta, StoryObj } from '@storybook/react'

import EditProfileButton from './EditProfileButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EditProfileButton> = {
  title: 'Templates/EditProfileButton',
  component: EditProfileButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof EditProfileButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'EditProfileButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'EditProfileButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'EditProfileButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'EditProfileButton',
  },
}
