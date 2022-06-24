import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type fontType = "GOOGLE" | "CUSTOM" | "SELECTED";
interface fontData { type: fontType, fontUrl: string, fontFamily: string } 

const googleFontMockData: fontData = {
    type: "GOOGLE",
    fontUrl: "https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap",
    fontFamily: "Rubik Moonrocks"
}

const customFontMockData: fontData = {
    type: "CUSTOM",
    fontUrl: "/Calistha.ttf",
    fontFamily: "Calistha"
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data: { font: fontData } = {
        font: customFontMockData
    }
    return {
        props: data
    }
}

const Page1 = ({ font }: { font: fontData }) => {

    useEffect(() => {
        if(font.type == "GOOGLE") {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet'
            linkElement.id = 'google-font'
            document.head.appendChild(linkElement)
            linkElement.href = font.fontUrl;
            localStorage.setItem('dynamic-font', font.fontFamily);
        }
        if(font.type == "CUSTOM") {
            const loadFont = async () => {
                const fontFace = new FontFace(font.fontFamily, `url(${font.fontUrl})`);
                (document as any).fonts.add(fontFace);
                await fontFace.load();
                localStorage.setItem('dynamic-font', font.fontFamily);
            }
            loadFont();
        }
    }, [])
    
    return (
        <Flex direction={'column'}>
            <Text fontWeight={"light"} fontSize={"14px"}>This is LIGHT_WEIGHT Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"medium"} fontSize={"14px"}>This is NORMAL Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"bold"} fontSize={"14px"}>This is BOLD Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"light"} fontSize={"20px"}>This is LIGHT_WEIGHT Text with font size of 20</Text>
            <Text mt = "30px" fontWeight={"medium"} fontSize={"20px"}>This is NORMAL Text with font size of 20</Text>
            <Text mt = "30px" fontWeight={"bold"} fontSize={"20px"}>This is BOLD Text with font size of 20</Text>
        </Flex>
    );
}

export default Page1;