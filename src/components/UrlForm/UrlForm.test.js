import React from 'react';
import UrlForm from './UrlForm';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

describe('UrlForm', () => {
  it('Should render two inputs and a submit button', () => {
		const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
			<UrlForm 
				submitUrl={mockSubmit}
			/>
    );

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const button = getByText('Shorten Please!');

		expect(titleInput).toBeInTheDocument();
		expect(urlInput).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	it('Should capture form inputs', () => {
		const mockSubmit = jest.fn();
		const { getByPlaceholderText } = render(
			<UrlForm 
				submitUrl={mockSubmit}
			/>
		);

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');

		fireEvent.change(titleInput, {target: {value: 'New submission'}});
		fireEvent.change(urlInput, {target: {value: 'https://dethpsun.tumblr.com/post/143590787939/mmxvi'}});

		expect(titleInput.value).toBe('New submission');
		expect(urlInput.value).toBe('https://dethpsun.tumblr.com/post/143590787939/mmxvi');
	});

	it('On submission, the submitUrl function should fired', () => {
		const mockSubmit = jest.fn();
		const { getByText } = render(
			<UrlForm 
				submitUrl={mockSubmit}
			/>
		);

    const button = getByText('Shorten Please!');

		fireEvent.click(button);

		expect(mockSubmit).toHaveBeenCalled();
	});
})