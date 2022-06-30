import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export type fontType = "GOOGLE" | "CUSTOM" | "SELECTED";
export interface fontData { type: fontType, fontUrl: string, fontFamily: string } 

export const googleFontMockData: fontData = {
    type: "GOOGLE",
    fontUrl: "https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap",
    fontFamily: "Rubik Moonrocks"
}

export const customFontMockData: fontData = {
    type: "CUSTOM",
    fontUrl: "/Calistha.ttf",
    fontFamily: "Calistha"
}

export const mockApi = async (): Promise<{ success: boolean, data: fontData }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({success: true, data: googleFontMockData}), 0)
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  const [fontData, setFontData] = useState<null | fontData>(null);
  const [font, setFont] = useState<string>('intial');

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if(event.url.substring(0, 21) == 'http://localhost:3020' && event.key == "fontData" && event.newValue != null) {
        const data: { font: string, fontName: string } = JSON.parse(event.newValue)
        setFontData({ type: "CUSTOM", fontFamily: data.fontName, fontUrl: data.font })
      }
      if(event.url.substring(0, 21) == 'http://localhost:3020' && event.key == "dynamic-font" && event.newValue != null) {
          setFont(event.newValue)
      }
    })
    const initialFont = localStorage.getItem('dynamic-font');
    if(initialFont) { setFont(initialFont) }
    const fetchFontData = async () => {
      const res = await mockApi();
      if(res.success && res.data) {
        setFontData(res.data)
      }
    }
    fetchFontData();
    return () => {
      window.removeEventListener("storage", () => {});
    }
  }, [])

  useEffect(() => {
    if(fontData) {
      if(fontData.type == "GOOGLE") {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet'
        linkElement.id = 'google-font'
        document.head.appendChild(linkElement)
        linkElement.href = fontData.fontUrl;
        setFont(fontData.fontFamily);
        localStorage.setItem('dynamic-font', fontData.fontFamily);
      }
      if(fontData.type == "CUSTOM") {
          const loadFont = async () => {
              const fontFace = new FontFace(fontData.fontFamily, `url(${fontData.fontUrl})`);
              (document as any).fonts.add(fontFace);
              await fontFace.load();
              setFont(fontData.fontFamily);
              localStorage.setItem('dynamic-font', fontData.fontFamily);
          }
          loadFont();
      }
    }
  }, [fontData])

  if(!fontData || font == 'initial') {
    return <div>
      <Head>
        <title>Font Loading POC</title>
      </Head>
    </div>
  }

  return <ChakraProvider>
    <Head>
      <style>{`html * { font-family: ${font} }`}</style>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
}

export default MyApp


/* function MyApp({ Component, pageProps }: AppProps) {
  const [fontDataFromPage, setFontDataFromPage] = useState<fontData>((pageProps as { font: fontData }).font);
  const [fontName, setFontName] = useState((pageProps as { font: fontData })?.font?.fontFamily)

  useEffect(() => {
    const font = localStorage.getItem('dynamic-font');
    if(font) {
      setFontName(font)
    }
  }, [])

  useEffect(() => {
    const fontD = (pageProps as { font: fontData }).font
    if(fontD && JSON.stringify(fontD) != JSON.stringify(fontDataFromPage)) {
      setFontDataFromPage(fontD)
      setFontName(fontD.fontFamily)
    }
  }, [pageProps])

  useEffect(() => {
    if(fontDataFromPage) {
      if(fontDataFromPage.type == "GOOGLE") {
        const prevLinkElement = document.getElementById('google-font') as HTMLLinkElement;
        if(prevLinkElement == null || (prevLinkElement && prevLinkElement.href !== fontDataFromPage.fontUrl)) {
          const linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet'
          linkElement.id = 'google-font'
          document.head.appendChild(linkElement)
          linkElement.href = fontDataFromPage.fontUrl;
          localStorage.setItem('dynamic-font', fontDataFromPage.fontFamily);
        }
      }
      if(fontDataFromPage.type == "CUSTOM") {
        const loadFont = async () => {
            const fontFace = new FontFace(fontDataFromPage.fontFamily, `url(${fontDataFromPage.fontUrl})`);
            (document as any).fonts.add(fontFace);
            await fontFace.load();
            localStorage.setItem('dynamic-font', fontDataFromPage.fontFamily);
        }
        loadFont();
      }
    }
  }, [fontDataFromPage])

  if(!fontName) {
    return <div>
      <Head>
        <title>Font Loading POC</title>
      </Head>
    </div>
  }

  return <ChakraProvider>
    <Head>
      <style>{`html * { font-family: ${fontName} }`}</style>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
}
export default MyApp */

