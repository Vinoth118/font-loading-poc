import { Button, CloseButton, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, SyntheticEvent, useState } from 'react';

const Home: NextPage = () => {
  const [selectedFontFile, setSelectedFontFile] = useState<{font: File, fontName: string} | null>(null);
  let fontPicker: HTMLInputElement | null
  
  const onGetFont = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
      setSelectedFontFile({font: event.target.files[0], fontName: event.target.files[0].name.replaceAll('.', '-')});
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
      const fontUrl = URL.createObjectURL(selectedFontFile.font);
      localStorage.setItem('fontData', JSON.stringify({font: fontUrl, fontName: selectedFontFile.fontName}))
      window.dispatchEvent(new StorageEvent('storage', { url: window.location.href, key: 'fontData',  newValue: JSON.stringify({font: fontUrl, fontName: selectedFontFile.fontName}) }));
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
          <Input mt = "20px" value = {selectedFontFile.fontName} onChange={(event) => setSelectedFontFile({ font: selectedFontFile.font, fontName: event.target.value })} />
          <Button mt = "20px" bg = "green.200" onClick={setFont}>Save and Active</Button>
        </Flex>
      }

    </Flex>
  )
}

export default Home
