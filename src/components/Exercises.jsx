import React, { useEffect, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from  '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import { ExerciseCard, Loader } from '.';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;

  //pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexofFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexofFirstExercise, indexOfLastExercise);

  const paginate = (e, value) => {
    
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  
  };

  
  useEffect(() => {

    const fetchExercisesData = async() => {
      
      let exercisesData = [];

      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exercisesData);

    };
    
    fetchExercisesData();

  }, [ bodyPart ]);

  if (!currentExercises.length) return <Loader/>;

  return (
    <Box id="exercises"
      sx={{ mt: { lg:'110px' }}}
      mt="50px"
      p="20px"  
    >
      <Typography variant="h3" mb="46px" >
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg:'110px', xs:'50px'}}}
              flexWrap="Wrap" justifyContent="center">
              { currentExercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} /> 
              ))}
      </Stack>
      <Stack alignItems="center"  sx={{ mt: { lg: '114px', xs: '70px' } }} >
        {exercises.length > 9 && (
          <Pagination 
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises