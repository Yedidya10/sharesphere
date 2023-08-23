import type { Meta, StoryObj } from '@storybook/react'

import ProfileSettingsButton from './ProfileSettingsButton'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileSettingsButton> = {
  title: 'Templates/ProfileSettingsButton',
  component: ProfileSettingsButton,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileSettingsButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProfileSettingsButton',
  },
}

export const Secondary: Story = {
  args: {
    label: 'ProfileSettingsButton',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'ProfileSettingsButton',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'ProfileSettingsButton',
  },
}
