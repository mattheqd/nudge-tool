import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="gray.100">
        <Flex h={16} marginLeft={2} marginRight={2} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column", sm:"row"}}>
            <Link to={"/"}  sx={{ fontSize: 'lg' }} >Nudge Tool</Link>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/login" }  sx={{ fontSize: 'lg' }}>Login</Link>
                <Link to={"/signup"}  sx={{ fontSize: 'lg' }}>Signup</Link>
            </HStack>
        </Flex>
    </Box>
  )
}

export default Navbar