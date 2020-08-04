import React from 'react';
import App from './App';
import '@testing-library/jest-dom';
import { getUrls, postUrl } from '../../apiCalls';
import { render, fireEvent, waitFor } from '@testing-library/react';
jest.mock('../../apiCalls');

describe('App', () => {
	getUrls.mockResolvedValue(
		{urls: [
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
	)

	postUrl.mockResolvedValue(
		{
			id: 3,
			long_url: 'https://weheartit.com/entry/265797825',
			short_url: 'http://localhost:3001/useshorturl/3',
			title: 'Sneks'
		}
	)

  it('Should display application title', () => {
    const { getByText } = render(
			<App />
    );

    const title = getByText('URL Shortener');

		expect(title).toBeInTheDocument();
	});

  it('Should display all urls in BE storage', async () => {
    const { getByText } = render(
			<App />
    );

    const urlCard1 = await waitFor(() => getByText('Awesome photo'));
    const url1 = await waitFor(() => getByText('http://localhost:3001/useshorturl/1'));
    const urlCard2 = await waitFor(() => getByText('Mountains'));
    const url2 = await waitFor(() => getByText('http://localhost:3001/useshorturl/2'));

		expect(urlCard1).toBeInTheDocument();
		expect(urlCard2).toBeInTheDocument();
		expect(url1).toBeInTheDocument();
		expect(url2).toBeInTheDocument();
	});

  it('On a new form submission, a new url card should be rendered', async () => {
    const { getByText, getByPlaceholderText } = render(
			<App />
    );

		const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const button = getByText('Shorten Please!');

		fireEvent.change(titleInput, {target: {value: 'Sneks'}});
		fireEvent.change(urlInput, {target: {value: 'https://weheartit.com/entry/265797825'}});

		fireEvent.click(button);

		const urlCard3 = await waitFor(() => getByText('Sneks'));
		const url3 = await waitFor(() => getByText('http://localhost:3001/useshorturl/3'));

		expect(urlCard3).toBeInTheDocument();
		expect(url3).toBeInTheDocument();
	});
})