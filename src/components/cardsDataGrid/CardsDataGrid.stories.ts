import type { Meta, StoryObj } from '@storybook/react'

import CardsDataGrid from './CardsDataGrid'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardsDataGrid> = {
  title: 'Templates/CardsDataGrid',
  component: CardsDataGrid,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
}

export default meta
type Story = StoryObj<typeof CardsDataGrid>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'CardsDataGrid',
  },
}

export const Secondary: Story = {
  args: {
    label: 'CardsDataGrid',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'CardsDataGrid',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'CardsDataGrid',
  },
}
