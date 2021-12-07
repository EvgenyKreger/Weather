import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {citySlice} from '../store/reducers/CitySlice';

import {FC} from 'react';

interface Input {
    updateAllCity:()=>void
}

const InputComplete:FC<Input> = (props) => {
    const {disable} = useAppSelector(state => state.cityReducer)
    const dispatch = useAppDispatch();
    const {listCities, value} = useAppSelector(state => state.cityReducer)
    return (
        <div className={'autocomplete'}>
            <Autocomplete
                sx={{
                    display: 'inline-block',
                    '& input': {
                        width: 350,
                        fontSize: 16,
                        height: 47,
                        marginTop: 3,
                        marginRight: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                id="input-demo"
                options={Object.values(listCities)}
                noOptionsText={'Введите не менее 3 букв для автопоиска'}
                getOptionLabel={(option) => option.full_name || ' '}
                inputValue={value}
                onInputChange={(event, newValue) => {
                    dispatch(citySlice.actions.inputValue(newValue));
                }}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input className={'search'} placeholder={'название города'}
                               type="text" {...params.inputProps} />

                    </div>
                )}
            />
            <div className={'updateAll'}   >
                <Button variant="contained" color="success" size={'large'} onClick={props.updateAllCity} disabled={disable}>
                    Обновить все города
                </Button>

            </div>
        </div>);
}

export default InputComplete;