import React, { useState } from 'react';
import { View } from 'react-native'
import { Searchbar, Button } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { set_search } from '../../redux/store';

const Search = ({ search }) => {
    const [searchQuery, setSearchQuery] = useState(''),
        dispatch = useDispatch(),

        onChangeSearch = query => setSearchQuery(query);

    const makeSearch = () => {
        dispatch(set_search(searchQuery))
        setSearchQuery('')
    }

    return (
        <View style={{ width: '65%', alignItems: 'center', alignSelf: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Button
                style={{ padding: 5, marginLeft: 10 }}
                mode="contained"
                onPress={makeSearch}
            >
                Search
            </Button>
        </View>
    );
};

export default Search;