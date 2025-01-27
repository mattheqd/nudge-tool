import React, { useEffect, useState} from 'react'
import { Stack, CheckboxGroup } from '@chakra-ui/react'
import { Checkbox } from "../components/ui/checkbox"


const LoginPage = () => {

  const [open, setOpen] = useState(false)

 return (
    <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
      <Stack spacing={[1, 5]} direction={['column', 'row']}>
        <Checkbox value='naruto' >Naruto</Checkbox>
        <Checkbox value='sasuke'>Sasuke</Checkbox>
        <Checkbox value='kakashi'>Kakashi</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};

export default LoginPage
