import type { Meta, StoryObj } from '@storybook/react'

import EditProfileForm from './EditProfileForm'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EditProfileForm> = {
  title: 'Templates/EditProfileForm',
  component: EditProfileForm,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof EditProfileForm>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'EditProfileForm',
  },
}

export const Secondary: Story = {
  args: {
    label: 'EditProfileForm',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'EditProfileForm',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'EditProfileForm',
  },
}
