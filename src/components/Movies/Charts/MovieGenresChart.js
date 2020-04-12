import React from 'react'
import {BarChart} from 'react-d3-components'

const MoviesGenresChart = (props) => {
    let genres = props.genres;
    let movies = props.movies;
    let numbermovies = [];
    let list = [];

    for (let i = 0; i < genres.length; i++) {
        numbermovies[i] = 0;
    }

    let gens=genres.map(g=>g.name);

    if(movies) {
        for (let i = 0; i < movies.length; i++) {
            let movieGenres = movies[i].genres;
            for (let j = 0; j < movieGenres.length; j++) {
                let index = gens.indexOf(movieGenres[j].name);
                if(index !== -1)
                    numbermovies[index]++;
            }
        }
    }

    for(let i = 0; i < gens.length; i++) {
        list.push({x: gens[i], y: numbermovies[i]});

    }

    let data = [
        {
            label: "somethingA",
            values: list.length > 0 ? list : [{x: [], y: []}]
        }
    ];

    const scale = () => {
        return '#BA0A0F';
    };

    return (
        <div style={{textAlign: "left !important", fontSize: "1rem !important"}} className={"my-2 container"}>
            <BarChart
                data={data}
                width={1100}
                height={600}
                margin={{top: 20, bottom: 50, left: 50, right: 10}}
                yAxis={{label: "Number of movies"}}
                xAxis={{label: "Genres"}}
                colorByLabel={true}
                colorScale={scale}
            />
        </div>
    );
};

export default MoviesGenresChart;