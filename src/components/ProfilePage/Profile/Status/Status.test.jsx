import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Status from './Status';

describe('Status component', () => {
   test('Статус из пропсов должен оказаться в элементе', () => {
      render(<Status status="test" />);
      const statusElement = screen.getByText('test');
      expect(statusElement).toBeInTheDocument;
      expect(statusElement.innerHTML).toBe('test');
   });
   test('Textarea появляется после нажатия на статус и содержит правильное значение', () => {
      render(<Status status="test" />);
      const statusElement = screen.getByText('test');
      fireEvent.click(statusElement);
      const textareaElement = screen.getByRole('textbox');
      expect(textareaElement).toBeInTheDocument;
      expect(textareaElement.value).toBe('test');
   });
   test('Textarea после потери фокуса исчезает и вызывает updateUserStatus с новым значением', () => {
      const mockUpdateStatus = jest.fn();
      render(<Status status="Initial status" updateUserStatus={mockUpdateStatus} />);

      const statusElement = screen.getByText('Initial status');
      fireEvent.click(statusElement);

      const textareaElement = screen.getByRole('textbox');
      expect(textareaElement).toBeInTheDocument;

      fireEvent.change(textareaElement, { target: { value: 'New status' } });

      fireEvent.blur(textareaElement);

      expect(mockUpdateStatus).toHaveBeenCalledTimes(1);
      expect(mockUpdateStatus).toHaveBeenCalledWith('New status');
      expect(screen.getByText('New status')).toBeInTheDocument();
   });
});
