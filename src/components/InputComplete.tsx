import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {citySlice} from '../store/reducers/CitySlice';

import {FC} from 'react';

interface Input {
    updateAllCity: () => void
}

const InputComplete: FC<Input> = (props) => {

    const {disable} = useAppSelector(state => state.cityReducer)
    const dispatch = useAppDispatch();
    const {listCities, value} = useAppSelector(state => state.cityReducer)
    console.log(value)
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
                        border: "3px solid #D9DADF",
                        borderRadius: 2,
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },

                }}
                id="input-demo"
                options={Object.values(listCities)}
                noOptionsText={<span style={{color: 'red', fontSize: 18 }}><span
                    style={{fontSize: 35, paddingRight: 20}}>⚠</span>Поле ввода принимает: «A-z» «A-я» «space» « , »
                « () » « - » </span>}
                getOptionLabel={(option) => option.full_name || ' '}
                inputValue={value}

                onInputChange={(event, value) => {
                    if (!value.replace(/[A-Za-zA-Яа-яЕе/' (),-]/g, '')) {
                        dispatch(citySlice.actions.inputValue(value))
                    }

                }}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input placeholder={'название города'}
                               type="text"  {...params.inputProps} />

                    </div>
                )}
            />
            <div className={'updateAll'}>
                <Button variant="contained" color="success" size={'large'} onClick={props.updateAllCity}
                        disabled={disable}>
                    Обновить все города
                </Button>

            </div>
        </div>);
}

export default React.memo(InputComplete);