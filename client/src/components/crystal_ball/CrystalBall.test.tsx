import React from 'react';
import { render, fireEvent, act, waitForElement } from '@testing-library/react';
import CrystalBall from './CrystalBall';

import axios from "axios";
jest.mock("axios");

test('renders CrystalBall', () => {
    //const { getByText } = render(<CrystalBall />);
    let linkElement: any = null;
    act(() => {
        const {getByText} = render(<CrystalBall/>)
        linkElement = getByText(/What is your future/i)
        expect(linkElement).toBeInTheDocument();
    })
    //const linkElement = getByText(/What is your future/i);
    
});

test("renders message from backend", async () => {
    //setup
    axios.get.mockResolvedValue({data: "message!"});
    act(()=>{
        const {getByText} = render(<CrystalBall />)
        fireEvent.click(getByText(/Get My Fortune Told/i))
    });

    //Get result
    const msgElement: any = await waitForElement(() =>
        document.getElementById("msg")
    );
    const text: string = msgElement.innerHTML.valueOf();

    //Assert
    expect(msgElement).toBeInTheDocument();
    expect(text).toContain("message!")
});
