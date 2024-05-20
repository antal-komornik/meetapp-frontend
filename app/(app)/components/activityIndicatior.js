import React from "react";
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base";

const Circle = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" size="xl" />
      {/* <Heading color="primary.500" fontSize="md">
        Loading
      </Heading> */}
    </HStack>
  );
};

export default function Spin() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Circle />
      </Center>
    </NativeBaseProvider>
  );
}
