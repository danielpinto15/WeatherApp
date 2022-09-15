import React from 'react';
import { CardContent, Typography, Card, Box, CardHeader } from "@material-ui/core";
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from "react-redux";
import Masonry from '@mui/lab/Masonry';

export default function Forecast() {
    const state = useSelector(state => state);

    let fiveDayforecastList = [];
    let count = 0;
    const weekday = ["Sunday","Monday","Tuesday","Thursday","Wednesday","Friday","Saturday"];

    if (state.data.length > 0) {
        for(let i = 0; i <= state.data.length - 1; i++){
            const day = state.data[i];
            const dayDateSplit = day.dt_txt.split(' ');
            const dayDate = new Date(dayDateSplit[0]);
            const dayOfTheWeek = weekday[dayDate.getDay()]
            
            if(fiveDayforecastList.length == 0) {
                fiveDayforecastList.push(day)
            }
    
            for(let j = 0; j < fiveDayforecastList.length; j++) {
                const listDayDateSplit = fiveDayforecastList[count].dt_txt.split(' ');
                const listDayDate = new Date(listDayDateSplit[0]);
                const listdayOfTheWeek = weekday[listDayDate.getDay()]
                if (dayOfTheWeek != listdayOfTheWeek){
                    fiveDayforecastList.push(day)
                    count++
                }
            }
        }

        fiveDayforecastList.shift()
    }

  return (
    <Box>
        <Masonry
            columns={5}
            spacing={2}
        >
            {fiveDayforecastList.length > 0 && fiveDayforecastList.map((day) => (
        <Card key={day.dt}>
            <CardHeader
              style={{ textAlign: 'center' }}
              title={weekday[new Date(day.dt_txt).getDay()]}
            />
          <CardMedia
            component="img"
            height="194"
            image={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="Snow"
          />
          <CardContent>
            <Typography variant="body2" style={{ textAlign: 'center' }} color="textSecondary">
                Max {`${Math.floor(day.main.temp_max)}°C`} Min {`${Math.floor(day.main.temp_min)}°C`}
            </Typography>
          </CardContent>
        </Card>
      ))}
        </Masonry>
    </Box>
  )
}
