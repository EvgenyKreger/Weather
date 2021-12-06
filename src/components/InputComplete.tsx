import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {citySlice} from '../store/reducers/CitySlice';

function InputComplete() {


    const dispatch = useAppDispatch();
    const {listCities,value} = useAppSelector(state => state.cityReducer)

    return (

            <Autocomplete

                sx={{
                    display: 'inline-block',
                    '& input': {
                        width: 500,
                        fontSize: 16,
                        height: 47,
                        marginTop: 5,
                        marginRight: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                id="input-demo"
                options={Object.values(listCities)}
                getOptionLabel={(option) => option.full_name}
                inputValue={value}
                onInputChange={(event, newValue) => {
                    dispatch(citySlice.actions.inputValue(newValue));

                }}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input className={'search'} placeholder={'Введите название города'}
                               type="text" {...params.inputProps} />
                        <Button color={'inherit'} variant="contained">Автообновление 5с
                            <Checkbox checked={false}/></Button>
                    </div>
                )}
            />

    );
}
export default InputComplete;