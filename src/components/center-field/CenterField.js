import React from 'react';
import GridGame from './GridGame';
import Painting from './Painting';
import MainScreen from './MainScreen';

export default function CenterField({ isGridOpen, isPaintOpen }) {
	if (isGridOpen || isPaintOpen) {
        if(isGridOpen) return (<GridGame/>)
        if(isPaintOpen) return (<Painting/>)    
    } else {
        return (<MainScreen/>)
    }
}