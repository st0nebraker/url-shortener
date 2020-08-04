import React from 'react';
import UrlContainer from './UrlContainer';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

describe('UrlContainer', () => {
  it('Should display the url item titles', () => {
		const mockDelete = jest.fn();
    const { getByText } = render(
			<UrlContainer 
				urls={[
					{
						id: 1,
						long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
						short_url: 'http://localhost:3001/useshorturl/1',
						title: 'Awesome photo'
					},
					{
						id: 2,
						long_url: 'https://dethpsun.tumblr.com/post/143590787939/mmxvi',
						short_url: 'http://localhost:3001/useshorturl/2',
						title: 'Mountains'
					}
				]}
				deleteUrl={mockDelete}
			/>
    );

    const title1 = getByText('Awesome photo');
    const title2 = getByText('Mountains');

		expect(title1).toBeInTheDocument();
		expect(title2).toBeInTheDocument();
	});

  it('Should display the url item shortened urls', () => {
		const mockDelete = jest.fn();
    const { getByText } = render(
			<UrlContainer 
				urls={[
					{
						id: 1,
						long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
						short_url: 'http://localhost:3001/useshorturl/1',
						title: 'Awesome photo'
					},
					{
						id: 2,
						long_url: 'https://dethpsun.tumblr.com/post/143590787939/mmxvi',
						short_url: 'http://localhost:3001/useshorturl/2',
						title: 'Mountains'
					}
				]}
				deleteUrl={mockDelete}
			/>
    );

    const tag1 = getByText('http://localhost:3001/useshorturl/1');
    const tag2 = getByText('http://localhost:3001/useshorturl/2');

		expect(tag1).toBeInTheDocument();
		expect(tag2).toBeInTheDocument();
	});

  it('If the delete button is clicked, the delete function should fire', () => {
		const mockDelete = jest.fn();
    const { getByText, getAllByText } = render(
			<UrlContainer 
				urls={[
					{
						id: 1,
						long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
						short_url: 'http://localhost:3001/useshorturl/1',
						title: 'Awesome photo'
					},
					{
						id: 2,
						long_url: 'https://dethpsun.tumblr.com/post/143590787939/mmxvi',
						short_url: 'http://localhost:3001/useshorturl/2',
						title: 'Mountains'
					}
				]}
				deleteUrl={mockDelete}
			/>
    );

    const deleteBtns = getAllByText('Delete');

		fireEvent.click(deleteBtns[0]);

		expect(mockDelete).toHaveBeenCalled();
	});
})