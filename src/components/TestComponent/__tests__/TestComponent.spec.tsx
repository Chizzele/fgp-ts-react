import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TestComponent } from '../../../index'

test('Renders', async () => {
  const { getByRole } = render(<TestComponent headingText="My First Component" backupText="hello"/>)
  expect(getByRole('heading')).toHaveTextContent('My First Component')
})