import { Button, CloseButton, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, SyntheticEvent, useState } from 'react';

const Home: NextPage = () => {
  const [selectedFontFile, setSelectedFontFile] = useState<File | null>(null);
  let fontPicker: HTMLInputElement | null
  
  const onGetFont = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
      setSelectedFontFile(event.target.files[0]);
    }
    if(fontPicker) {
      fontPicker.value = "";
    }
  }

  const onDeleteFont = () => {
    setSelectedFontFile(null);
  }

  const setFont = async () => {
    if(selectedFontFile) {
      const fontUrl = URL.createObjectURL(selectedFontFile);

      const fontFace = new FontFace('dynamic-font', `url(${fontUrl})`);
      (document as any).fonts.add(fontFace);
      await fontFace.load();

      // var dynamic_font = document.createElement('style');
      // dynamic_font.appendChild(document.createTextNode(
      //   `@font-face {
      //       font-family: 'dynamic-font';
      //       src: url(${fontUrl});
      //   }`
      // ));
      // document.head.appendChild(dynamic_font);

      //const font = document.createElement('link');
      //font.rel='stylesheet'
      //font.id = 'dynamic-font'
      //document.head.appendChild(font)
      //font.href = fontUrl;
    }
  }

  return (
    <Flex w = "100%" alignItems={"center"} direction={"column"}>

      <Head>
        <title>Font Loading POC</title>
        <meta name="description" content="POC for loading fonts from server side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text fontSize={"30px"}>Sample Text</Text>

      <Flex w = "100%" justifyContent={"center"} mt = "50px">
        <input type="file" style = {{display: 'none'}} onInput = {onGetFont} ref ={input => fontPicker = input} accept={".ttf"} />
        <Button onClick={() => fontPicker?.click()} bg = "green.100">Click to Pick Font</Button>
      </Flex>

      {
        selectedFontFile != null && 
        <Flex p = "30px" position={"relative"} bg = "gray.100" borderRadius={"10px"} mt = "30px" w = "100%" direction={"column"}>
          <CloseButton onClick = {onDeleteFont} position={"absolute"} top = "5px" right={"5px"} />
          <Button mt = "10px" bg = "green.200" onClick={setFont}>Save and Active</Button>
        </Flex>
      }

    </Flex>
  )
}

export default Home
