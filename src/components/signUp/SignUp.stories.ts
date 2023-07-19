import type { Meta, StoryObj } from '@storybook/react'

import SignUp from './SignUp'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SignUp> = {
  title: 'Components/Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignUp>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'SignUp',
  },
}

export const Secondary: Story = {
  args: {
    label: 'SignUp',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'SignUp',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SignUp',
  },
}
